import { useEffect, useState } from "react";
import { getVersion } from "../api";

// Главная страница скелета: показывает версию бэкенда из /api/version
export default function Home() {
  const [info, setInfo] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVersion().then(setInfo).catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SLA Planner</h1>
      <div className="bg-white rounded-lg shadow p-4 max-w-md">
        <h2 className="font-semibold mb-2">Статус бэкенда</h2>
        {error && <p className="text-red-600">Бэкенд недоступен: {error}</p>}
        {info && (
          <ul className="text-sm space-y-1">
            <li><b>Название:</b> {String(info.name)}</li>
            <li><b>Версия:</b> {String(info.version)}</li>
            <li>
              <b>Zabbix read-only:</b>{" "}
              {info.zabbix_read_only ? "да" : "нет"}
            </li>
          </ul>
        )}
      </div>
      <p className="text-slate-500 text-sm mt-4">
        Далее по блокам: граф SLA (vis-network), календарь работ, формы, auth, отчёты.
      </p>
    </div>
  );
}
