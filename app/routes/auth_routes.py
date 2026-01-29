from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..auth import verify_admin, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(body: LoginRequest):
    if not verify_admin(body.username, body.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(body.username)
    return {
        "access_token": token,
        "token_type": "bearer"
    }