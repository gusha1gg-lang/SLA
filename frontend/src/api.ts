// Минимальный API-клиент. Вызовы появятся вместе с блоками 3–9.
const BASE = "/api";

export async function getVersion() {
  const res = await fetch(`${BASE}/version`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
