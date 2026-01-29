import requests
from .config import WOO_URL, WOO_CK, WOO_CS

TIMEOUT = 20


def woo_get(path: str, params: dict | None = None):
    r = requests.get(
        f"{WOO_URL}{path}",
        params=params,
        auth=(WOO_CK, WOO_CS),
        timeout=TIMEOUT
    )
    r.raise_for_status()
    return r.json()


def woo_put(path: str, payload: dict):
    r = requests.put(
        f"{WOO_URL}{path}",
        json=payload,
        auth=(WOO_CK, WOO_CS),
        timeout=TIMEOUT
    )
    r.raise_for_status()
    return r.json()


def woo_delete(path: str, params: dict | None = None):
    r = requests.delete(
        f"{WOO_URL}{path}",
        params=params,
        auth=(WOO_CK, WOO_CS),
        timeout=TIMEOUT
    )
    r.raise_for_status()
    return r.json() if r.content else {"deleted": True}