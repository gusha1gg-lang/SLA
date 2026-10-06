"""Конфигурация приложения (env-переменные / .env)."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    APP_NAME: str = "SLA Planner"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    DATABASE_URL: str = "sqlite+aiosqlite:///./sla_planner.db"

    ZABBIX_URL: str = "http://localhost:8080/api_jsonrpc.php"
    ZABBIX_USER: str = "Admin"
    ZABBIX_PASSWORD: str = "zabbix"
    # На проде — True: портал только читает (sla.update запрещён)
    ZABBIX_READ_ONLY: bool = True

    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 720


@lru_cache
def get_settings() -> Settings:
    return Settings()
