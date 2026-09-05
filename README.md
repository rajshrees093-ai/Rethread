# ReThread

> *"Give Every Thread a Second Life."*

[![SDG 12](https://img.shields.io/badge/SDG%2012-Responsible%20Consumption%20%26%20Production-557A60?style=for-the-badge)](https://sdgs.un.org/goals/goal12)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20Tailwind-blue?style=for-the-badge)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-009688?style=for-the-badge)](https://fastapi.tiangolo.com/)
[![Privacy](https://img.shields.io/badge/Privacy-Zero%20Image%20Retention-success?style=for-the-badge)](#responsible-ai--ethics)

---

## 1. Project Overview

**ReThread** is an AI-powered sustainable clothing decision-support platform designed to help consumers explore sustainable alternatives for clothing they no longer wear before considering disposal.

Rather than treating clothing as disposable waste, ReThread evaluates observable fabric condition, wear patterns, and user intent to suggest the most circular pathway:

1. **REPAIR** — Mend minor tears, seams, or buttons to restore wearability.
2. **REUSE** — Style differently, layer for new seasons, or repurpose for comfortable home wear.
3. **DONATE** — Pass wearable, clean garments forward to local charities or friends.
4. **UPCYCLE** — Creatively convert textiles into totes, plant holders, pouches, and organizers.
5. **RECYCLE** — Reclaim raw textile fibers at dedicated collection points when garments are no longer wearable.

---

## 2. Official Problem Statement

> *"How might we use AI to help people make sustainable decisions about unwanted clothing so that clothing consumption and disposal can become more sustainable?"*

---

## 3. SDG Alignment

### **Primary Goal: SDG 12 — Responsible Consumption and Production**
- **Target 12.5:** By 2030, substantially reduce waste generation through prevention, reduction, recycling, and reuse.
- **Project Role:** ReThread introduces a critical mindful pause at the consumer level, preventing wearable or repurposable garments from entering municipal solid waste streams.

---

## 4. Target Users

- **Students & Young Adults:** Accessible DIY upcycling guides, campus thrift awareness, and budget-friendly wardrobe longevity.
- **Households & Families:** Practical decisions for outgrown clothing, torn garments, and fabric repurposing.
- **Conscious Consumers:** Clear advice on local circular fashion practices before discarding.

---

## 5. System Workflow & AI Role

```
USER INPUT (Describe or Upload Photo)
      ↓
CLOTHING INFORMATION (Type, Condition, Reason)
      ↓
AI ANALYSIS & VISION REASONING
      ↓
CONDITION + CONTEXT ASSESSMENT
      ↓
SUSTAINABLE CIRCULAR PATHWAYS EVALUATION
      ↓
RECOMMENDATION + OBSERVABLE REASONS
      ↓
ALTERNATIVE OPTIONS COMPARISON
      ↓
STEP-BY-STEP DIY UPCYCLING GUIDES
```

### Where AI Helps:
- **Classification:** Identifies garment types and material textures.
- **Condition Assessment:** Evaluates observable wear and tear.
- **Decision Support:** Compares 5 circular options to recommend the highest-impact action.
- **Transparent Explanations:** Explains *why* an action was chosen using observable checkmarks.
- **Creative Assistance:** Tailors step-by-step upcycling recipes (materials, time, and instructions).
- **Conversational Assistance:** The floating **ReThread Assistant** answers everyday questions on garment care, repair, and circular living.

---

## 6. Architecture & Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS (Glassmorphism design system), Lucide React icons, Canvas Confetti.
- **Backend:** Python 3.10+, FastAPI, Uvicorn, Pydantic, Pillow, Python-Multipart.
- **AI Service:** Modular architecture supporting **Google Gemini API** (`gemini-1.5-flash`) for multimodal vision and an intelligent **Deterministic Knowledge Engine** fallback that ensures 100% functionality even without an external API key.

---

## 7. Project Structure

```
ReThread/
├── backend/
│   ├── main.py              # FastAPI application & endpoints
│   ├── ai_service.py        # Decision engine, Gemini integration & upcycling catalog
│   ├── requirements.txt     # Backend dependencies
│   └── .env.example         # Environment template
│
├── frontend/
│   ├── index.html           # HTML entry with Google typography (Playfair + Jakarta)
│   ├── package.json         # Node.js dependencies
│   ├── vite.config.js       # Vite build & proxy config
│   ├── tailwind.config.js   # Custom color palette & glassmorphism utilities
│   ├── src/
│   │   ├── App.jsx          # Root shell & page routing
│   │   ├── index.css        # Glassmorphism & organic ambient CSS
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Floating glass navbar & mobile drawer
│   │   │   ├── HeroVisual.jsx           # Circular lifecycle interactive node visual
│   │   │   ├── AssistantWidget.jsx      # ReThread Assistant conversational popup
│   │   │   ├── UpcyclingDetailModal.jsx # Step-by-step DIY tutorial modal
│   │   │   └── Footer.jsx               # Minimal footer & SDG 12 badge
│   │   └── pages/
│   │       ├── HomePage.jsx             # Editorial hero & feature showcase
│   │       ├── AnalyzePage.jsx          # Describe & Upload tabs + 3-stage loader
│   │       ├── ResultPage.jsx           # Recommendation card, reasons & alternatives
│   │       ├── UpcyclingPage.jsx        # Curated DIY upcycling project grid
│   │       ├── HowItWorksPage.jsx       # 4-step process & pipeline visual
│   │       ├── ImpactPage.jsx           # SDG 12 principles & personal impact estimator
│   │       ├── ResponsibleAIPage.jsx    # Ethics, fairness, transparency & privacy
│   │       └── AboutPage.jsx            # Mission, timeline, problem statement & roadmap
└── README.md                # Comprehensive documentation
```

---

## 8. Setup & Running Locally

### Prerequisites
- **Node.js** (v18 or newer) & **npm**
- **Python** (v3.10 or newer) & **pip**

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The backend API will run at `http://localhost:8000`.*

### 2. Frontend Setup
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The web app will open at `http://localhost:5173`.*

---

## 9. Environment Variables

Create a `.env` file in the `backend/` folder if you wish to use live Google Gemini multimodal vision:

```env
# Optional: If omitted, ReThread uses its built-in deterministic AI logic engine
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
HOST=0.0.0.0
```

---

## 10. Responsible AI & Ethics

ReThread is built following 4 core ethical principles:

1. **Fairness:** Avoids assumptions about user socio-economic access; supports diverse repair and donation streams.
2. **Transparency:** Every recommendation includes clear, observable bullet points explaining *why* it was suggested.
3. **Privacy & Data Minimization:** **Zero Image Retention.** Photos uploaded for analysis are processed in volatile memory during the active session and are never saved or harvested.
4. **Human Agency:** AI provides decision support, not mandatory commands. Users make the final informed decision.

---

## 11. Future Scope

- Geolocated local donation center and drop-box finder.
- Dedicated textile recycling locator with specific fiber acceptance rules.
- Personal Wardrobe Longevity Tracker.
- Peer-to-peer neighborhood clothing repair and swapping circles.
- Multilingual accessibility for global circular communities.

---

## 12. Evaluation & Branding Compliance

- **Brand Name:** ReThread *(strictly without "AI" appended)*.
- **Tagline:** *"Give Every Thread a Second Life."*
- **Aesthetic:** Editorial typography, warm ivory/neutral tones, subtle glassmorphism cards, soft sage green accents.
