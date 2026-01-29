from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .auth import decode_token

security = HTTPBearer(auto_error=False)


def get_current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(security)
):
    if not creds:
        raise HTTPException(status_code=401, detail="Missing token")

    return decode_token(creds.credentials)