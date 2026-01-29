#uvicorn app.main:app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.auth_routes import router as auth_router
from .routes.orders import router as orders_router
from .routes.products import router as products_router

app = FastAPI(title="Woo Admin Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(orders_router)
app.include_router(products_router)


@app.get("/health")
def health():
    return {"ok": True}