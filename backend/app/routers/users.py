from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

users = []

@router.get("/")
def list_users():
    return {"users": users}