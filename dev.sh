#!/usr/bin/env bash
# Dev-запуск: бэкенд (:8000) + фронтенд (:5173)
set -e
cd "$(dirname "$0")"

(cd backend && uvicorn app.main:app --reload --port 8000) &
BACK_PID=$!
trap "kill $BACK_PID 2>/dev/null" EXIT

cd frontend && npm run dev
