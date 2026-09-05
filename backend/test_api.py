import json
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    print("[PASS] Health check passed:", data)

def test_analyze_repair():
    payload = {
        "clothing_type": "Jeans",
        "condition": "Slightly Damaged",
        "reason": "It is damaged",
        "description": "Small tear near pocket, zipper works fine"
    }
    response = client.post("/api/analyze-json", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["recommendation"] == "REPAIR"
    assert len(data["data"]["why_points"]) >= 2
    assert len(data["data"]["alternatives"]) == 4
    print("[PASS] Analyze repair case passed:", data["data"]["recommendation"])

def test_analyze_donate():
    payload = {
        "clothing_type": "Shirt",
        "condition": "Like New",
        "reason": "It doesn't fit",
        "description": "Worn twice, 100% linen"
    }
    response = client.post("/api/analyze-json", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["recommendation"] == "DONATE"
    print("[PASS] Analyze donate case passed:", data["data"]["recommendation"])

def test_analyze_upcycle():
    payload = {
        "clothing_type": "Jeans",
        "condition": "Heavily Damaged",
        "reason": "Looking for upcycling",
        "description": "Want to craft a tote bag or pouch"
    }
    response = client.post("/api/analyze-json", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["recommendation"] == "UPCYCLE"
    print("[PASS] Analyze upcycle case passed:", data["data"]["recommendation"])

def test_upcycle_ideas():
    payload = {"clothing_type": "Jeans"}
    response = client.post("/api/upcycle", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["ideas"]) >= 3
    assert data["ideas"][0]["title"] == "Denim Tote Bag"
    assert len(data["ideas"][0]["steps"]) >= 3
    print("[PASS] Upcycle ideas fetch passed:", len(data["ideas"]), "ideas found.")

def test_chat():
    payload = {
        "message": "What should I do with old jeans?",
        "history": []
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["reply"]) > 20
    print("[PASS] Chat assistant passed:", data["reply"][:60] + "...")

def test_auth_login():
    payload = {
        "email": "demo@rethread.org",
        "password": "password123"
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["user"]["email"] == "demo@rethread.org"
    print("[PASS] Auth login test passed for demo account:", data["user"]["name"])

def test_auth_signup():
    payload = {
        "name": "Sarah Jenkins",
        "email": "sarah.jenkins@example.com",
        "password": "secretPassword456",
        "interest": "Mending & Repairs"
    }
    response = client.post("/api/auth/signup", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["user"]["name"] == "Sarah Jenkins"
    print("[PASS] Auth signup test passed for new user:", data["user"]["name"])

if __name__ == "__main__":
    print("--- Running ReThread API Verification Suite ---")
    test_health()
    test_analyze_repair()
    test_analyze_donate()
    test_analyze_upcycle()
    test_upcycle_ideas()
    test_chat()
    test_auth_login()
    test_auth_signup()
    print("--- All 8 Verification Tests Passed Successfully! ---")
