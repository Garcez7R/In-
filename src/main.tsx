import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accessibility,
  Bell,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  HeartHandshake,
  Home,
  MapPin,
  Menu,
  Navigation,
  Plus,
  Route,
  Search,
  ShieldCheck,
  Star,
  WifiOff
} from 'lucide-react';
import './styles.css';

type Place = {
  id: number;
  name: string;
  kind: string;
  area: string;
  score: number;
  features: string[];
  status: 'Verificado' | 'Em revisao';
};

const places: Place[] = [
  {
    id: 1,
    name: 'Estacao Central',
    kind: 'Transporte',
    area: 'Centro',
    score: 96,
    status: 'Verificado',
    features: ['rampa', 'elevador', 'piso tatil']
  },
  {
    id: 2,
    name: 'Clinica Horizonte',
    kind: 'Saude',
    area: 'Jardins',
    score: 91,
    status: 'Verificado',
    features: ['guiche baixo', 'libras', 'banheiro acessivel']
  },
  {
    id: 3,
    name: 'Biblioteca Viva',
    kind: 'Cultura',
    area: 'Boa Vista',
    score: 84,
    status: 'Em revisao',
    features: ['entrada nivelada', 'rota ampla', 'audio apoio']
  }
];

const tasks = [
  { label: 'Validar entrada da Farmacia Nativa', time: 'Hoje', done: false },
  { label: 'Responder pedido de rota assistida', time: '14:30', done: false },
  { label: 'Enviar feedback sobre elevador', time: 'Concluido', done: true }
];

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    });
  }
}

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegacao principal">
        <a className="brand" href="#inicio" aria-label="In+ inicio">
          <img src="/inplus-logo.png" alt="" />
          <span>In+</span>
        </a>
        <nav className="nav-list">
          <a className="active" href="#inicio">
            <Home size={18} />
            Inicio
          </a>
          <a href="#lugares">
            <MapPin size={18} />
            Lugares
          </a>
          <a href="#rotas">
            <Route size={18} />
            Rotas
          </a>
          <a href="#apoio">
            <HeartHandshake size={18} />
            Apoio
          </a>
        </nav>
        <div className="offline-card">
          <WifiOff size={18} />
          <span>Pronto para uso offline com dados recentes em cache.</span>
        </div>
      </aside>

      <section className="workspace" id="inicio">
        <header className="topbar">
          <button className="icon-button" aria-label="Abrir menu">
            <Menu size={20} />
          </button>
          <div className="search">
            <Search size={18} />
            <input aria-label="Buscar lugares, rotas ou recursos" placeholder="Buscar lugar, rota ou recurso" />
          </div>
          <button className="icon-button" aria-label="Notificacoes">
            <Bell size={20} />
          </button>
        </header>

        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Rede de acessibilidade urbana</p>
            <h1>In+</h1>
            <p>
              Encontre lugares acessiveis, acompanhe rotas seguras e registre barreiras para
              transformar a cidade em um espaco mais autonomo.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#lugares">
                <Navigation size={18} />
                Explorar agora
              </a>
              <a className="secondary-action" href="#relato">
                <Plus size={18} />
                Relatar barreira
              </a>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <img src="/inplus-logo.png" alt="" />
          </div>
        </section>

        <section className="metrics" aria-label="Indicadores">
          <article>
            <Accessibility size={20} />
            <strong>248</strong>
            <span>pontos mapeados</span>
          </article>
          <article>
            <ShieldCheck size={20} />
            <strong>91%</strong>
            <span>validacao media</span>
          </article>
          <article>
            <CalendarCheck size={20} />
            <strong>32</strong>
            <span>acoes na semana</span>
          </article>
        </section>

        <div className="content-grid">
          <section className="panel" id="lugares">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Mapa vivo</p>
                <h2>Lugares acessiveis</h2>
              </div>
              <button className="text-button">
                Ver todos
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="place-list">
              {places.map((place) => (
                <article className="place-card" key={place.id}>
                  <div className="place-score">{place.score}</div>
                  <div>
                    <div className="place-title">
                      <h3>{place.name}</h3>
                      <span className={place.status === 'Verificado' ? 'status ok' : 'status review'}>
                        {place.status}
                      </span>
                    </div>
                    <p>
                      {place.kind} em {place.area}
                    </p>
                    <div className="chips">
                      {place.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel compact" id="rotas">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Hoje</p>
                <h2>Prioridades</h2>
              </div>
              <ClipboardCheck size={22} />
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <label className="task-row" key={task.label}>
                  <input type="checkbox" defaultChecked={task.done} />
                  <span>
                    <strong>{task.label}</strong>
                    <small>{task.time}</small>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="panel report-panel" id="relato">
            <div>
              <p className="eyebrow">Colaborativo</p>
              <h2>Novo relato</h2>
            </div>
            <form className="report-form">
              <label>
                Local
                <input placeholder="Nome do lugar" />
              </label>
              <label>
                Tipo de barreira
                <select defaultValue="entrada">
                  <option value="entrada">Entrada sem acesso</option>
                  <option value="rota">Rota interrompida</option>
                  <option value="atendimento">Atendimento sem apoio</option>
                </select>
              </label>
              <label>
                Detalhes
                <textarea placeholder="Descreva o que aconteceu" rows={4} />
              </label>
              <button type="button" className="primary-action">
                <CircleAlert size={18} />
                Registrar relato
              </button>
            </form>
          </section>

          <section className="panel compact" id="apoio">
            <p className="eyebrow">Sinais de confianca</p>
            <h2>Validacoes</h2>
            <div className="validation-list">
              <div>
                <Check size={18} />
                <span>Auditoria comunitaria ativa</span>
              </div>
              <div>
                <Star size={18} />
                <span>Ranking por criterios claros</span>
              </div>
              <div>
                <HeartHandshake size={18} />
                <span>Apoio entre usuarios e locais</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
