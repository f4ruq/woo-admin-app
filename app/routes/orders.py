from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ..deps import get_current_user
from ..woo_client import woo_get, woo_put

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
    dependencies=[Depends(get_current_user)]
)

# =========================
# MODELS
# =========================

class OrderStatusPayload(BaseModel):
    status: str


# =========================
# GET ORDERS
# =========================

@router.get("")
def list_orders(
    status: str | None = None,
    page: int = 1,
    per_page: int = 20,
    search: str | None = None
):
    params = {
        "page": page,
        "per_page": per_page
    }

    if status:
        params["status"] = status

    if search:
        params["search"] = search

    return woo_get("/wp-json/wc/v3/orders", params)


@router.get("/{order_id}")
def get_order(order_id: int):
    return woo_get(f"/wp-json/wc/v3/orders/{order_id}")


# =========================
# UPDATE ORDER STATUS
# =========================

@router.post("/{order_id}/status")
def change_order_status(order_id: int, payload: OrderStatusPayload):
    """
    Order status günceller.
    Frontend şu body ile POST atar:
    {
      "status": "completed"
    }
    """

    try:
        response = woo_put(
            f"/wp-json/wc/v3/orders/{order_id}",
            {"status": payload.status}
        )

        # WooCommerce hata döndürmüşse
        if isinstance(response, dict) and response.get("code"):
            raise HTTPException(status_code=400, detail=response)

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))