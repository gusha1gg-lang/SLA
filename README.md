# SLA Planner

Веб-портал между инженерами и Zabbix 7.0. Планирование техработ (ТО,
обновления БД, замена сертификатов) с автоматическим созданием
«исключений простоя» (excluded downtime) в SLA Zabbix через JSON-RPC API.

## Границы безопасности

- Портал **не** трогает хосты, триггеры, алерты.
- Портал **не** имеет доступа к БД Zabbix — только JSON-RPC API.
- Единственный пишущий метод Zabbix — `sla.update` (read-modify-write
  массива `excluded_downtimes`).
- На проде режим read-only по умолчанию (`ZABBIX_READ_ONLY=true`).

## Ключевые факты Zabbix 7.0

- SLA и Service — разные сущности, `slaid ≠ serviceid`.
- Связь — через теги: у услуги `{tag:"service", value:"X"}`, у SLA —
  `service_tags`, матчащиеся с тегами услуг. Не по именам!
- Авторизация: заголовок `Authorization: Bearer <token>` (поле `auth` не работает).
- Логин: `user.login` с полем `username`.
- `sla.update` ПЕРЕЗАПИСЫВАЕТ весь массив `excluded_downtimes` —
  поэтому перед записью читаем текущий список через
  `sla.get(selectExcludedDowntimes: ...)`.

## Стек

- **Backend:** Python 3.11+, FastAPI, SQLAlchemy (async), Alembic, httpx.
  SQLite (тест) → PostgreSQL (прод).
- **Frontend:** React + TypeScript + Vite + Tailwind + vis-network.
- **Auth портала:** JWT, роли admin / planner / viewer.

## Структура

```
backend/
  app/
    main.py       # FastAPI entrypoint (/health, /api/version)
    config.py     # настройки из .env
    api/          # роутеры (добавляются по блокам)
  requirements.txt
  .env.example
frontend/
  src/            # React + Vite
dev.sh            # запуск бэка и фронта вместе
```

## Запуск (dev)

```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev        # http://localhost:5173, API проксируется на :8000
```

## Функциональность (по блокам)

1. ✅ Скелет: FastAPI `/health`, `/api/version`, React-страница
2. ⬜ Модели БД + Alembic
3. ⬜ Zabbix-клиент (Bearer-auth, retry, service.get / sla.get / sla.update)
4. ⬜ Синхронизация SLA и услуг + связь через теги
5. ⬜ CRUD плановых работ
6. ⬜ Push в Zabbix (read-modify-write `sla.update`)
7. ⬜ Фронт: граф SLA (vis-network), календарь, формы работ
8. ⬜ Auth + роли + аудит-лог
9. ⬜ SLA-отчёт
10. ⬜ Тесты
11. ⬜ Прод-конфиг (PostgreSQL, Docker)

## Тестовый Zabbix

`http://localhost:8080/api_jsonrpc.php` (Admin / zabbix, v7.0).
Прод-Zabbix не трогаем.
