import Home from "./pages/Home";

// Каркас приложения. Роутер и страницы добавляются по блокам:
// /graph — дерево услуг и SLA (vis-network), /calendar — плановые работы,
// /works — формы, /report — SLA-отчёт, /login — авторизация.
export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
        <span className="font-bold">SLA Planner</span>
        <span className="text-xs text-slate-300">Zabbix 7.0 · JSON-RPC · read-only по умолчанию</span>
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}
