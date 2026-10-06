"""SLA Planner — FastAPI backend entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings

settings = get_settings()

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

# CORS для dev-фронта (Vite, порт 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Роутеры будут добавляться по мере реализации блоков:
# auth, sla/services (sync), planned works, push в Zabbix, audit, отчёты


@app.get("/health", tags=["system"])
async def health():
    """Проверка живости сервиса."""
    return {"status": "ok"}


@app.get("/api/version", tags=["system"])
async def version():
    """Версия приложения."""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "zabbix_read_only": settings.ZABBIX_READ_ONLY,
    }
