# Woo Admin Backend

A custom **FastAPI-based admin backend** built for managing WooCommerce stores.

This project is designed as an alternative to the default WordPress / WooCommerce admin panel, focusing on **speed, simplicity, and mobile-friendly usage** for daily operational tasks such as order and product management.

---

## Features

- Direct integration with WooCommerce REST API
- JWT-based authentication
- Order listing and detailed order view
- Order status updates
- Product listing
- Product price and stock status updates
- Product deletion
- Protected endpoints with token-based access control

---

## Architecture

Client (Frontend)
  |
  |  JWT Authentication
  v
FastAPI Backend
  |
  |  REST API
  v
WooCommerce (WordPress)

- The backend acts purely as an **API gateway**
- All data is sourced from WooCommerce
- No application state is stored in the backend

---

## Tech Stack

- Python 3
- FastAPI
- Uvicorn
- Requests
- WooCommerce REST API
- JWT Authentication

---

## Environment Variables

Create a `.env` file in the project root:

WOO_URL=https://example.com  
WOO_CK=ck_xxxxxxxxxxxxxxxxx  
WOO_CS=cs_xxxxxxxxxxxxxxxxx  
ADMIN_USERNAME=xxxxx
ADMIN_PASSWORD=supersecretpassword
JWT_SECRET=supersecretkey  
JWT_EXPIRE_MINUTES=120

Never commit real credentials to the repository.

---

## Running the Project

Using a virtual environment is recommended.

pip install -r requirements.txt  
uvicorn app.main:app --reload  

The backend will be available at:

http://127.0.0.1:5500

---

## Authentication

All endpoints are protected using JWT.

1. Obtain a token via `/auth/login`
2. Include it in requests as a header:

Authorization: Bearer <token>

---

## API Documentation

FastAPI provides automatic Swagger documentation:

http://127.0.0.1:8000/docs

---

## Notes

- The backend is stateless
- All read/write operations go through WooCommerce
- The frontend is intentionally excluded from this repository
- WooCommerce API keys must have write permissions enabled

The entire frontend was built using a vibe-coding approach. I am not a frontend developer, and the UI was created pragmatically with help from multiple LLMs and Google Stitch, focusing on functionality rather than frontend best practices.
---

<img width="1369" height="690" alt="Ekran Resmi 2026-01-30 00 45 41" src="https://github.com/user-attachments/assets/9ec79434-8a9c-48d5-9484-6aaa61d29874" />
<img width="490" height="825" alt="Ekran Resmi 2026-01-30 00 47 46" src="https://github.com/user-attachments/assets/7e862745-23d4-45d4-8c78-9ede81202dc9" />
<img width="484" height="822" alt="Ekran Resmi 2026-01-30 00 53 51" src="https://github.com/user-attachments/assets/49bc6d9f-f0f5-443f-b2f1-9a859a21a042" />
<img width="482" height="817" alt="Ekran Resmi 2026-01-30 00 48 13" src="https://github.com/user-attachments/assets/6c6fcf79-f270-4247-b511-cdb410635665" />
<img width="487" height="819" alt="Ekran Resmi 2026-01-30 00 49 00" src="https://github.com/user-attachments/assets/402bf5ae-f84b-413b-b626-03d2ad76f112" />
<img width="495" height="819" alt="Ekran Resmi 2026-01-30 00 49 33" src="https://github.com/user-attachments/assets/352fb3d8-e08b-45ee-abba-3d95417be2f6" />
<img width="490" height="821" alt="Ekran Resmi 2026-01-30 00 54 41" src="https://github.com/user-attachments/assets/c1d99733-cefe-4be8-b5ed-6c915b1bac76" />


## Purpose

This project was built to:

- Enable faster admin workflows
- Improve mobile usability
- Avoid the complexity of the default WordPress admin panel

---

## License

Free to use for personal and commercial projects.  
No warranty is provided.
