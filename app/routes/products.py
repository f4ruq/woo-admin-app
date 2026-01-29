from fastapi import APIRouter, Depends, HTTPException
from ..deps import get_current_user
from ..woo_client import woo_get, woo_put, woo_delete

router = APIRouter(
    prefix="/products",
    tags=["products"],
    dependencies=[Depends(get_current_user)]
)


@router.get("")
def list_products(page: int = 1, per_page: int = 20):
    return woo_get(
        "/wp-json/wc/v3/products",
        {"page": page, "per_page": per_page}
    )


@router.get("/{product_id}")
def get_product(product_id: int):
    return woo_get(f"/wp-json/wc/v3/products/{product_id}")


@router.put("/{product_id}")
def update_product(product_id: int, body: dict):
    """
    Allowed:
    - name
    - description
    - regular_price
    - stock_status (instock / outofstock)
    - images (array)
    """
    allowed_keys = {
        "name",
        "description",
        "regular_price",
        "stock_status",
        "images",
    }

    payload = {k: v for k, v in body.items() if k in allowed_keys}

    if not payload:
        raise HTTPException(status_code=400, detail="No valid fields")

    return woo_put(f"/wp-json/wc/v3/products/{product_id}", payload)


@router.delete("/{product_id}")
def delete_product(product_id: int):
    return woo_delete(f"/wp-json/wc/v3/products/{product_id}")