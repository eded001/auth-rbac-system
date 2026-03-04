from fastapi import APIRouter
from app.schemas.auth_schema import LoginRequest, RegisterRequest
from app.routers.users import users

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
def login(login_request: LoginRequest):
    for user in users:
        if (
            user["email"] == login_request.email and
            user["password"] == login_request.password
        ):
            return {
                "email": user["email"]
            }

    return {"error": "Invalid email or password"}

@router.post("/register")
def register(register_request: RegisterRequest):
    for user in users:
        if user["email"] == register_request.email:
            return {"error": "Email already registered"}

    new_user = {
        "email": register_request.email,
        "password": register_request.password
    }

    users.append(new_user)

    return {
        "email": new_user["email"]
    }
