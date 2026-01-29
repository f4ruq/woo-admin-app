import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

WOO_URL = os.getenv("WOO_URL", "").rstrip("/")
WOO_CK = os.getenv("WOO_CK", "")
WOO_CS = os.getenv("WOO_CS", "")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")

JWT_SECRET = os.getenv("JWT_SECRET", "")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "120"))

if not WOO_URL or not WOO_CK or not WOO_CS:
    raise RuntimeError("Missing WOO_* variables")

if not ADMIN_USERNAME or not ADMIN_PASSWORD or not JWT_SECRET:
    raise RuntimeError("Missing ADMIN_* or JWT_* variables")