import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accessibility,
  AlertTriangle,
  Bell,
  Building2,
  Check,
  ChevronRight,
  CircleGauge,
  ClipboardCheck,
  Ear,
  Eye,
  HeartHandshake,
  Home,
  MapPin,
  Menu,
  MessageSquarePlus,
  Navigation,
  Plus,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  UsersRound,
  Waves,
  Wifi
} from 'lucide-react';
import './styles.css';

type Place = {
  id: number;
  name: string;
  category: string;
  area: string;
  distance: string;
  score: number;
  status: 'Verificado' | 'Em validacao';
  lastCheck: string;
  tags: string[];
  signals: string[];
  issues: string[];
  position: { x: number; y: number };
};

type Need = {
  label: string;
  count: number;
  active?: boolean;
  icon: typeof Accessibility;
};

const needs: Need[] = [
  { label: 'Ostomia', count: 18, active: true, icon: Stethoscope },
  { label: 'Mobilidade', count: 42, active: true, icon: Accessibility },
  { label: 'Sensorial', count: 11, icon: Waves },
  { label: 'Visual', count: 16, icon: Eye },
  { label: 'Auditiva', count: 9, icon: Ear }
];

const places: Place[] = [
  {
    id: 1,
    name: 'Shopping Jardim Norte',
    category: 'Compras e servicos',
    area: 'Zona Norte',
    distance: '1,8 km',
    score: 94,
    status: 'Verificado',
    lastCheck: 'Atualizado hoje',
    tags: ['banheiro ostomia', 'elevador', 'rota coberta'],
    signals: ['Cabine privativa com bancada', 'Entrada nivelada pela Rua 3', 'Equipe treinada no balcao sul'],
    issues: ['Piso tatil interrompido no acesso B'],
    position: { x: 68, y: 31 }
  },
  {
    id: 2,
    name: 'Clinica Vida Plena',
    category: 'Saude',
    area: 'Centro',
    distance: '2,4 km',
    score: 91,
    status: 'Verificado',
    lastCheck: 'Atualizado ontem',
    tags: ['guiche baixo', 'Libras', 'banheiro acessivel'],
    signals: ['Atendimento prioritario sinalizado', 'Banheiro acessivel no terreo', 'Sala silenciosa sob demanda'],
    issues: ['Vaga acessivel sem cobertura'],
    position: { x: 45, y: 58 }
  },
  {
    id: 3,
    name: 'Estacao Central',
    category: 'Transporte',
    area: 'Centro',
    distance: '3,1 km',
    score: 86,
    status: 'Em validacao',
    lastCheck: '3 relatos recentes',
    tags: ['rampa', 'piso tatil', 'elevador'],
    signals: ['Elevador operacional no acesso leste', 'Rampa com corrimao duplo'],
    issues: ['Relato de fila bloqueando rota acessivel'],
    position: { x: 29, y: 42 }
  }
];

const reports = [
  { place: 'Mercado Sol', type: 'Banheiro indisponivel', priority: 'Alta', time: '12 min' },
  { place: 'Parque das Flores', type: 'Rota com degrau', priority: 'Media', time: '38 min' },
  { place: 'Terminal Oeste', type: 'Elevador em manutencao', priority: 'Alta', time: '1 h' }
];

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    });
  }
}

function App() {
  const featuredPlace = places[0];

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegacao principal">
        <a className="brand" href="#inicio" aria-label="In+ inicio">
          <img src="/inplus-logo-v2.png" alt="" />
          <span>In+</span>
        </a>

        <nav className="nav-list">
          <a className="active" href="#inicio">
            <Home size={18} />
            Painel
          </a>
          <a href="#mapa">
            <MapPin size={18} />
            Mapa
          </a>
          <a href="#rotas">
            <Route size={18} />
            Rotas
          </a>
          <a href="#relatos">
            <MessageSquarePlus size={18} />
            Relatos
          </a>
        </nav>

        <div className="trust-box">
          <ShieldCheck size={20} />
          <strong>Dados com contexto</strong>
          <span>Validação por comunidade, data da visita e critérios claros de acesso.</span>
        </div>
      </aside>

      <section className="workspace" id="inicio">
        <header className="topbar">
          <button className="icon-button" aria-label="Abrir menu">
            <Menu size={20} />
          </button>
          <div className="search">
            <Search size={18} />
            <input aria-label="Buscar lugares ou recursos" placeholder="Buscar por lugar, recurso ou necessidade" />
          </div>
          <button className="primary-button">
            <Plus size={18} />
            Novo relato
          </button>
          <button className="icon-button" aria-label="Notificacoes">
            <Bell size={20} />
          </button>
        </header>

        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Acesso antes do deslocamento</p>
            <h1>Saia sabendo o que vai encontrar.</h1>
            <p>
              O In+ organiza informações verificáveis sobre banheiros, rotas, atendimento e barreiras
              para reduzir incerteza antes da chegada.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#mapa">
                <Navigation size={18} />
                Ver lugares perto de mim
              </a>
              <a className="secondary-action" href="#relatos">
                <AlertTriangle size={18} />
                Reportar barreira
              </a>
            </div>
          </div>
          <div className="hero-insight" aria-label="Resumo de confianca">
            <div className="score-ring">
              <span>94</span>
              <small>score</small>
            </div>
            <strong>{featuredPlace.name}</strong>
            <p>{featuredPlace.signals[0]}</p>
            <div className="mini-tags">
              {featuredPlace.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="quick-stats" aria-label="Indicadores">
          <article>
            <CircleGauge size={20} />
            <strong>86%</strong>
            <span>lugares com critérios revisados</span>
          </article>
          <article>
            <UserRoundCheck size={20} />
            <strong>127</strong>
            <span>contribuições verificadas</span>
          </article>
          <article>
            <Wifi size={20} />
            <strong>Offline</strong>
            <span>dados recentes disponíveis no PWA</span>
          </article>
        </section>

        <section className="filters-panel" aria-label="Filtros de acessibilidade">
          <div>
            <p className="eyebrow">Perfis de necessidade</p>
            <h2>Filtrar por condição de acesso</h2>
          </div>
          <div className="need-list">
            {needs.map((need) => {
              const Icon = need.icon;
              return (
                <button className={need.active ? 'need-chip active' : 'need-chip'} key={need.label}>
                  <Icon size={18} />
                  <span>{need.label}</span>
                  <small>{need.count}</small>
                </button>
              );
            })}
          </div>
        </section>

        <div className="product-grid">
          <section className="map-panel" id="mapa">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Mapa de confiança</p>
                <h2>Lugares próximos</h2>
              </div>
              <button className="text-button">
                Abrir mapa
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="map-canvas" aria-label="Mapa ilustrativo de lugares acessíveis">
              <div className="map-route" />
              {places.map((place) => (
                <button
                  className={place.status === 'Verificado' ? 'map-pin verified' : 'map-pin review'}
                  style={{ left: `${place.position.x}%`, top: `${place.position.y}%` }}
                  key={place.id}
                  aria-label={place.name}
                >
                  <MapPin size={18} />
                </button>
              ))}
              <div className="map-card">
                <span>Melhor opção agora</span>
                <strong>{featuredPlace.name}</strong>
                <small>{featuredPlace.distance} · {featuredPlace.score}% confiável</small>
              </div>
            </div>
          </section>

          <section className="places-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Resultados priorizados</p>
                <h2>Compatíveis com seu perfil</h2>
              </div>
            </div>

            <div className="place-list">
              {places.map((place) => (
                <article className="place-card" key={place.id}>
                  <div className="place-score">{place.score}</div>
                  <div className="place-body">
                    <div className="place-title">
                      <h3>{place.name}</h3>
                      <span className={place.status === 'Verificado' ? 'status ok' : 'status review'}>
                        {place.status}
                      </span>
                    </div>
                    <p>
                      {place.category} · {place.area} · {place.distance}
                    </p>
                    <div className="chips">
                      {place.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-panel" id="rotas">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Perfil do lugar</p>
                <h2>{featuredPlace.name}</h2>
              </div>
              <Building2 size={22} />
            </div>
            <div className="detail-list">
              {featuredPlace.signals.map((signal) => (
                <div key={signal}>
                  <Check size={18} />
                  <span>{signal}</span>
                </div>
              ))}
              {featuredPlace.issues.map((issue) => (
                <div className="warning" key={issue}>
                  <AlertTriangle size={18} />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="reports-panel" id="relatos">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Operação comunitária</p>
                <h2>Relatos aguardando validação</h2>
              </div>
              <ClipboardCheck size={22} />
            </div>
            <div className="report-list">
              {reports.map((report) => (
                <article key={`${report.place}-${report.type}`}>
                  <div>
                    <strong>{report.place}</strong>
                    <span>{report.type}</span>
                  </div>
                  <small className={report.priority === 'Alta' ? 'priority high' : 'priority'}>
                    {report.priority}
                  </small>
                  <time>{report.time}</time>
                </article>
              ))}
            </div>
          </section>

          <section className="stoma-panel">
            <div>
              <p className="eyebrow">Módulo especializado</p>
              <h2>In+ Stoma</h2>
              <p>
                Informações sobre privacidade, bancada, descarte, espaço de troca e confiança do
                banheiro antes da pessoa chegar ao local.
              </p>
            </div>
            <div className="module-icons" aria-hidden="true">
              <HeartHandshake />
              <UsersRound />
              <Sparkles />
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
