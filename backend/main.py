import os
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from ai_service import AIService, GEMINI_API_KEY

app = FastAPI(
    title="ReThread API",
    description="Sustainable Clothing Decision-Support Engine Aligned with SDG 12",
    version="1.0.0"
)

# Enable CORS for frontend development and local preview
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeJSONRequest(BaseModel):
    clothing_type: str = Field(..., description="Type of clothing (e.g., Jeans, T-shirt, Jacket)")
    condition: str = Field(..., description="Condition (Like New, Good, Slightly Damaged, Heavily Damaged)")
    reason: str = Field(..., description="Reason for not using it")
    description: Optional[str] = Field("", description="User observations or extra details")

class UpcycleRequest(BaseModel):
    clothing_type: str = Field(..., description="Garment type to get upcycling projects for")

class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    message: str = Field(..., description="User question")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Recent conversation history")

@app.get("/")
def read_root():
    return {
        "product": "ReThread",
        "tagline": "Give Every Thread a Second Life.",
        "status": "online",
        "sdg": "SDG 12: Responsible Consumption and Production",
        "ai_engine": "Gemini Multimodal Live" if GEMINI_API_KEY else "Deterministic Rule & Knowledge Engine"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "product": "ReThread",
        "ai_mode": "Gemini Live" if GEMINI_API_KEY else "Deterministic Fallback Active",
        "has_api_key": bool(GEMINI_API_KEY)
    }

@app.post("/api/analyze")
async def analyze_clothing_endpoint(
    clothing_type: Optional[str] = Form(None),
    condition: Optional[str] = Form(None),
    reason: Optional[str] = Form(None),
    description: Optional[str] = Form(""),
    image: Optional[UploadFile] = File(None)
):
    """
    Multimodal & text clothing analysis endpoint.
    Accepts form-data with optional image upload and clothing metadata.
    """
    try:
        type_val = clothing_type or "Garment"
        cond_val = condition or "Good"
        reason_val = reason or "I don't wear it anymore"
        desc_val = description or ""

        image_bytes = None
        image_mime = None

        if image:
            # Check file format
            valid_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
            if image.content_type and image.content_type.lower() in valid_types:
                image_bytes = await image.read()
                image_mime = image.content_type
                # Limit image payload to 10MB
                if len(image_bytes) > 10 * 1024 * 1024:
                    raise HTTPException(status_code=400, detail="Image size exceeds maximum limit of 10MB.")
            else:
                # If invalid image type provided, ignore image or report friendly note
                pass

        result = AIService.analyze_clothing(
            clothing_type=type_val,
            condition=cond_val,
            reason=reason_val,
            description=desc_val,
            image_bytes=image_bytes,
            image_mime_type=image_mime
        )

        return {
            "success": True,
            "data": result
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[API Error] Analysis error: {e}")
        # Safe fallback without exposing stack traces
        fallback = AIService._deterministic_analysis(
            clothing_type or "Garment",
            condition or "Good",
            reason or "I don't wear it anymore",
            description or "",
            False
        )
        return {
            "success": True,
            "data": fallback
        }

@app.post("/api/analyze-json")
def analyze_json_endpoint(req: AnalyzeJSONRequest):
    """
    JSON-based analysis endpoint for rapid client requests without file upload.
    """
    try:
        result = AIService.analyze_clothing(
            clothing_type=req.clothing_type,
            condition=req.condition,
            reason=req.reason,
            description=req.description or ""
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        print(f"[API Error] JSON Analysis error: {e}")
        fallback = AIService._deterministic_analysis(
            req.clothing_type,
            req.condition,
            req.reason,
            req.description or "",
            False
        )
        return {
            "success": True,
            "data": fallback
        }

@app.post("/api/upcycle")
def upcycle_ideas_endpoint(req: UpcycleRequest):
    """
    Fetch upcycling project ideas tailored for a specific garment type.
    """
    try:
        ideas = AIService.get_upcycling_ideas(req.clothing_type)
        return {
            "success": True,
            "clothing_type": req.clothing_type,
            "ideas": ideas
        }
    except Exception as e:
        print(f"[API Error] Upcycle error: {e}")
        return {
            "success": True,
            "clothing_type": req.clothing_type,
            "ideas": []
        }

@app.post("/api/chat")
def chat_assistant_endpoint(req: ChatRequest):
    """
    Conversational ReThread Assistant endpoint.
    """
    try:
        history_dicts = [{"sender": h.sender, "text": h.text} for h in req.history] if req.history else []
        response = AIService.answer_chat(req.message, history_dicts)
        return {
            "success": True,
            "reply": response["reply"],
            "source": response.get("source", "ReThread Knowledge Base")
        }
    except Exception as e:
        print(f"[API Error] Chat error: {e}")
        return {
            "success": True,
            "reply": "I'm here to help you make sustainable choices for your clothes! Ask me about repairing, donating, upcycling, or recycling unwanted garments.",
            "source": "ReThread Fallback"
        }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
