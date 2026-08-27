import { StrictMode, useEffect, useMemo, useState } from 'react';
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
  Download,
  Ear,
  Eye,
  FileCheck,
  HeartHandshake,
  Home,
  LockKeyhole,
  MapPin,
  Menu,
  MessageSquarePlus,
  Navigation,
  Plus,
  Route,
  Scale,
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

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type Place = {
  id: number;
  name: string;
  category: string;
  area: string;
  distance: string;
  score: number;
  status: 'Verificado' | 'Em validação';
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

type View = 'dashboard' | 'detail' | 'report' | 'favorites' | 'profile';

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
    category: 'Compras e serviços',
    area: 'Zona Norte',
    distance: '1,8 km',
    score: 94,
    status: 'Verificado',
    lastCheck: 'Atualizado hoje',
    tags: ['banheiro ostomia', 'elevador', 'rota coberta'],
    signals: ['Cabine privativa com bancada', 'Entrada nivelada pela Rua 3', 'Equipe treinada no balcão sul'],
    issues: ['Piso tátil interrompido no acesso B'],
    position: { x: 68, y: 31 }
  },
  {
    id: 2,
    name: 'Clínica Vida Plena',
    category: 'Saúde',
    area: 'Centro',
    distance: '2,4 km',
    score: 91,
    status: 'Verificado',
    lastCheck: 'Atualizado ontem',
    tags: ['guichê baixo', 'Libras', 'banheiro acessível'],
    signals: ['Atendimento prioritário sinalizado', 'Banheiro acessível no térreo', 'Sala silenciosa sob demanda'],
    issues: ['Vaga acessível sem cobertura'],
    position: { x: 45, y: 58 }
  },
  {
    id: 3,
    name: 'Estação Central',
    category: 'Transporte',
    area: 'Centro',
    distance: '3,1 km',
    score: 86,
    status: 'Em validação',
    lastCheck: '3 relatos recentes',
    tags: ['rampa', 'piso tátil', 'elevador'],
    signals: ['Elevador operacional no acesso leste', 'Rampa com corrimão duplo'],
    issues: ['Relato de fila bloqueando rota acessível'],
    position: { x: 29, y: 42 }
  }
];

const reports = [
  { place: 'Mercado Sol', type: 'Banheiro indisponível', priority: 'Alta', time: '12 min' },
  { place: 'Parque das Flores', type: 'Rota com degrau', priority: 'Média', time: '38 min' },
  { place: 'Terminal Oeste', type: 'Elevador em manutenção', priority: 'Alta', time: '1 h' }
];

const complianceItems = [
  {
    title: 'LGPD',
    text: 'Coleta mínima, finalidade explícita, consentimento para dados sensíveis e transparência sobre uso das contribuições.',
    icon: LockKeyhole
  },
  {
    title: 'Marco Civil',
    text: 'Registro responsável, segurança no tratamento, rastreabilidade operacional e respeito à privacidade do usuário.',
    icon: Scale
  },
  {
    title: 'Governança',
    text: 'Critérios de validação, revisão comunitária, base legal documentada e fluxo para remoção ou correção de dados.',
    icon: FileCheck
  }
];

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      let refreshing = false;
      const reloadFlag = 'inplus.update.reload';
      sessionStorage.removeItem(reloadFlag);

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing || sessionStorage.getItem(reloadFlag)) return;
        refreshing = true;
        sessionStorage.setItem(reloadFlag, '1');
        window.location.reload();
      });

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (
          event.data?.type === 'INPLUS_APP_UPDATED' &&
          navigator.serviceWorker.controller &&
          !sessionStorage.getItem(reloadFlag)
        ) {
          sessionStorage.setItem(reloadFlag, '1');
          window.location.reload();
        }
      });

      navigator.serviceWorker
        .register('/sw.js', { updateViaCache: 'none' })
        .then((registration) => {
          const activateUpdate = () => {
            const waitingWorker = registration.waiting;
            if (waitingWorker && navigator.serviceWorker.controller) {
              waitingWorker.postMessage({ type: 'INPLUS_SKIP_WAITING' });
            }
          };

          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (!installingWorker) return;

            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                installingWorker.postMessage({ type: 'INPLUS_SKIP_WAITING' });
              }
            });
          });

          activateUpdate();
          window.addEventListener('focus', () => registration.update());
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
              registration.update();
            }
          });
          window.setInterval(() => registration.update(), 15 * 60 * 1000);
        })
        .catch(() => undefined);
    });
  }
}

function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setInstalled(true);
    }

    setInstallPrompt(null);
  };

  return {
    canInstall: Boolean(installPrompt),
    installed,
    installApp
  };
}

function App() {
  const [selectedNeed, setSelectedNeed] = useState('Ostomia');
  const [selectedPlaceId, setSelectedPlaceId] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<View>('dashboard');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [formState, setFormState] = useState({ place: 'Shopping Jardim Norte', issue: 'Banheiro sem suporte', details: '' });
  const [online, setOnline] = useState(() => navigator.onLine);
  const { canInstall, installed, installApp } = useInstallPrompt();

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return places.filter((place) => {
      const matchesSearch =
        normalized.length === 0 ||
        place.name.toLowerCase().includes(normalized) ||
        place.category.toLowerCase().includes(normalized) ||
        place.tags.some((tag) => tag.toLowerCase().includes(normalized));

      if (!matchesSearch) return false;

      if (selectedNeed === 'Ostomia') return place.tags.some((tag) => tag.includes('ostomia') || tag.includes('banheiro'));
      if (selectedNeed === 'Mobilidade') return place.tags.some((tag) => tag.includes('elevador') || tag.includes('rampa') || tag.includes('guichê'));
      if (selectedNeed === 'Sensorial') return place.tags.some((tag) => tag.includes('silenciosa') || tag.includes('tátil'));
      if (selectedNeed === 'Visual') return place.tags.some((tag) => tag.includes('Libras') || tag.includes('coberta') || tag.includes('rota'));
      if (selectedNeed === 'Auditiva') return place.tags.some((tag) => tag.includes('Libras') || tag.includes('silenciosa'));
      return true;
    });
  }, [searchTerm, selectedNeed]);

  const featuredPlace = filteredPlaces.find((place) => place.id === selectedPlaceId) ?? filteredPlaces[0] ?? places[0];

  useEffect(() => {
    if (filteredPlaces.length > 0 && !filteredPlaces.some((place) => place.id === selectedPlaceId)) {
      setSelectedPlaceId(filteredPlaces[0].id);
    }
  }, [filteredPlaces, selectedPlaceId]);

  const favoritePlaces = places.filter((place) => favorites.includes(place.id));

  const toggleFavorite = (placeId: number) => {
    setFavorites((current) =>
      current.includes(placeId) ? current.filter((id) => id !== placeId) : [...current, placeId]
    );
  };

  const handleReportSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReportSubmitted(true);
    setFormState({ place: 'Shopping Jardim Norte', issue: 'Banheiro sem suporte', details: '' });
    setTimeout(() => setReportSubmitted(false), 2200);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegacao principal">
        <a className="brand" href="#inicio" aria-label="In+ inicio">
          <img src="/inplus-icon-192.png" alt="" />
          <span>In+</span>
        </a>

        <nav className="nav-list" aria-label="Menu principal">
          <button type="button" className={view === 'dashboard' ? 'nav-item active' : 'nav-item'} onClick={() => setView('dashboard')}>
            <Home size={18} />
            Painel
          </button>
          <button type="button" className={view === 'detail' ? 'nav-item active' : 'nav-item'} onClick={() => setView('detail')}>
            <MapPin size={18} />
            Detalhes
          </button>
          <button type="button" className={view === 'report' ? 'nav-item active' : 'nav-item'} onClick={() => setView('report')}>
            <MessageSquarePlus size={18} />
            Relatar
          </button>
          <button type="button" className={view === 'favorites' ? 'nav-item active' : 'nav-item'} onClick={() => setView('favorites')}>
            <HeartHandshake size={18} />
            Favoritos
          </button>
          <button type="button" className={view === 'profile' ? 'nav-item active' : 'nav-item'} onClick={() => setView('profile')}>
            <UserRoundCheck size={18} />
            Perfil
          </button>
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
            <input
              aria-label="Buscar lugares ou recursos"
              placeholder="Buscar por lugar, recurso ou necessidade"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <button className="primary-button" onClick={installApp} disabled={!canInstall && installed}>
            {installed ? <Check size={18} /> : canInstall ? <Download size={18} /> : <Plus size={18} />}
            {installed ? 'App instalado' : canInstall ? 'Instalar app' : 'Novo relato'}
          </button>
          <button className="icon-button" aria-label="Notificacoes">
            <Bell size={20} />
          </button>
        </header>

        {!online && <div className="inline-banner offline">Modo offline: você continua com dados locais do app.</div>}

        {view === 'dashboard' && (
          <>
            <section className="hero-panel">
              <div className="hero-copy">
                <p className="eyebrow">Acesso antes do deslocamento</p>
                <h1>Saia sabendo o que vai encontrar.</h1>
                <p>
                  O In+ organiza informações verificáveis sobre banheiros, rotas, atendimento e barreiras para reduzir incerteza antes da chegada.
                </p>
                <div className="hero-actions">
                  <button className="primary-action" type="button" onClick={() => setView('detail')}>
                    <Navigation size={18} />
                    Ver detalhe do local
                  </button>
                  <button className="secondary-action" type="button" onClick={() => setView('report')}>
                    <AlertTriangle size={18} />
                    Reportar barreira
                  </button>
                </div>
              </div>

              <div className="hero-insight" aria-label="Resumo de confianca">
                <div className="score-ring">
                  <span>{featuredPlace.score}</span>
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
                <strong>Atualiza</strong>
                <span>nova versão aplicada automaticamente ao reabrir ou focar o app</span>
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
                    <button
                      key={need.label}
                      type="button"
                      className={selectedNeed === need.label ? 'need-chip active' : 'need-chip'}
                      onClick={() => {
                        setSelectedNeed(need.label);
                        if (need.label === 'Ostomia') setSelectedPlaceId(1);
                        if (need.label === 'Mobilidade') setSelectedPlaceId(2);
                        if (need.label === 'Sensorial' || need.label === 'Visual' || need.label === 'Auditiva') setSelectedPlaceId(3);
                      }}
                      aria-pressed={selectedNeed === need.label}
                    >
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
                  <button className="text-button" type="button" onClick={() => setView('detail')}>
                    Abrir mapa
                    <ChevronRight size={17} />
                  </button>
                </div>

                <div className="map-canvas" aria-label="Mapa ilustrativo de lugares acessíveis">
                  <div className="map-route" />
                  {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                      <button
                        className={place.id === selectedPlaceId ? 'map-pin verified' : 'map-pin review'}
                        style={{ left: `${place.position.x}%`, top: `${place.position.y}%` }}
                        key={place.id}
                        aria-label={place.name}
                        type="button"
                        onClick={() => {
                          setSelectedPlaceId(place.id);
                          setView('detail');
                        }}
                      >
                        <MapPin size={18} />
                      </button>
                    ))
                  ) : (
                    <div className="empty-state">
                      <p>Nenhum lugar encontrado para sua busca.</p>
                    </div>
                  )}
                  {featuredPlace && (
                    <div className="map-card">
                      <span>Melhor opção agora</span>
                      <strong>{featuredPlace.name}</strong>
                      <small>{featuredPlace.distance} · {featuredPlace.score}% confiável</small>
                    </div>
                  )}
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
                  {filteredPlaces.length === 0 ? (
                    <div className="empty-state small">
                      <p>Nenhum resultado.</p>
                    </div>
                  ) : (
                    filteredPlaces.map((place) => (
                      <button
                        type="button"
                        key={place.id}
                        className={place.id === selectedPlaceId ? 'place-card selected' : 'place-card'}
                        onClick={() => {
                          setSelectedPlaceId(place.id);
                          setView('detail');
                        }}
                      >
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
                      </button>
                    ))
                  )}
                </div>
              </section>

              <section className="detail-panel" id="rotas">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Perfil do lugar</p>
                    <h2>{featuredPlace.name}</h2>
                  </div>
                  <button className="icon-button compact" type="button" onClick={() => toggleFavorite(featuredPlace.id)} aria-label="Favoritar local">
                    <HeartHandshake size={18} />
                  </button>
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

              <section className="compliance-panel" id="conformidade">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Conformidade</p>
                    <h2>Privacidade, segurança e responsabilidade</h2>
                  </div>
                  <ShieldCheck size={22} />
                </div>
                <div className="compliance-grid">
                  {complianceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title}>
                        <Icon size={20} />
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
          </>
        )}

        {view === 'detail' && (
          <section className="screen-panel detail-screen">
            <div className="screen-header">
              <div>
                <p className="eyebrow">Local selecionado</p>
                <h2>{featuredPlace.name}</h2>
              </div>
              <button className="primary-action" type="button" onClick={() => toggleFavorite(featuredPlace.id)}>
                {favorites.includes(featuredPlace.id) ? 'Remover favorito' : 'Salvar como favorito'}
              </button>
            </div>

            <div className="detail-grid">
              <article className="detail-card">
                <div className="meta-row">
                  <span className={featuredPlace.status === 'Verificado' ? 'status ok' : 'status review'}>{featuredPlace.status}</span>
                  <span>{featuredPlace.lastCheck}</span>
                </div>
                <h3>Resumo do local</h3>
                <p>{featuredPlace.category} · {featuredPlace.area} · {featuredPlace.distance}</p>
                <div className="score-inline">
                  <strong>{featuredPlace.score}</strong>
                  <span>Confiabilidade geral</span>
                </div>
              </article>

              <article className="detail-card">
                <h3>O que funciona</h3>
                <ul>
                  {featuredPlace.signals.map((signal) => (<li key={signal}>{signal}</li>))}
                </ul>
              </article>

              <article className="detail-card warning-card">
                <h3>Itens a observar</h3>
                <ul>
                  {featuredPlace.issues.map((issue) => (<li key={issue}>{issue}</li>))}
                </ul>
              </article>
            </div>

            <div className="action-row">
              <button className="primary-action" type="button" onClick={() => setView('report')}>Reportar problema</button>
              <button className="secondary-action" type="button" onClick={() => setView('dashboard')}>Voltar ao painel</button>
            </div>
          </section>
        )}

        {view === 'report' && (
          <section className="screen-panel report-screen">
            <div className="screen-header">
              <div>
                <p className="eyebrow">Relato</p>
                <h2>Reportar barreira</h2>
              </div>
            </div>

            <form className="report-form" onSubmit={handleReportSubmit}>
              <label>
                <span>Local</span>
                <select value={formState.place} onChange={(event) => setFormState((current) => ({ ...current, place: event.target.value }))}>
                  {places.map((place) => <option key={place.id} value={place.name}>{place.name}</option>)}
                </select>
              </label>

              <label>
                <span>Tipo de problema</span>
                <input
                  type="text"
                  value={formState.issue}
                  onChange={(event) => setFormState((current) => ({ ...current, issue: event.target.value }))}
                />
              </label>

              <label>
                <span>Detalhes</span>
                <textarea
                  rows={5}
                  value={formState.details}
                  placeholder="Descreva o que foi observado, quando aconteceu e como isso afeta a acessibilidade."
                  onChange={(event) => setFormState((current) => ({ ...current, details: event.target.value }))}
                />
              </label>

              <div className="action-row">
                <button className="primary-action" type="submit">Enviar relato</button>
                <button className="secondary-action" type="button" onClick={() => setView('dashboard')}>Cancelar</button>
              </div>

              {reportSubmitted && <div className="success-banner">Relato enviado com sucesso.</div>}
            </form>
          </section>
        )}

        {view === 'favorites' && (
          <section className="screen-panel favorites-screen">
            <div className="screen-header">
              <div>
                <p className="eyebrow">Favoritos</p>
                <h2>Locais salvos</h2>
              </div>
            </div>

            {favoritePlaces.length === 0 ? (
              <div className="empty-state large">
                <p>Você ainda não salvou nenhum lugar.</p>
              </div>
            ) : (
              <div className="favorite-list">
                {favoritePlaces.map((place) => (
                  <button type="button" className="favorite-card" key={place.id} onClick={() => { setSelectedPlaceId(place.id); setView('detail'); }}>
                    <div>
                      <strong>{place.name}</strong>
                      <span>{place.category}</span>
                    </div>
                    <div className="favorite-meta">
                      <span>{place.distance}</span>
                      <span>{place.score}%</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {view === 'profile' && (
          <section className="screen-panel profile-screen">
            <div className="screen-header">
              <div>
                <p className="eyebrow">Perfil</p>
                <h2>Minha jornada</h2>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-topline">
                <div className="avatar">IP</div>
                <div>
                  <strong>Isabela Pereira</strong>
                  <span>Usuária ativa · Ostomia</span>
                </div>
              </div>

              <div className="profile-grid">
                <article>
                  <span>Locais visitados</span>
                  <strong>24</strong>
                </article>
                <article>
                  <span>Relatos enviados</span>
                  <strong>8</strong>
                </article>
                <article>
                  <span>Favoritos</span>
                  <strong>{favoritePlaces.length}</strong>
                </article>
              </div>
            </div>
          </section>
        )}
      </section>

      <nav className="bottom-nav" aria-label="Navegação mobile">
        <button type="button" className={view === 'dashboard' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => setView('dashboard')}>
          <Home size={18} />
          <span>Painel</span>
        </button>
        <button type="button" className={view === 'detail' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => setView('detail')}>
          <MapPin size={18} />
          <span>Mapa</span>
        </button>
        <button type="button" className={view === 'report' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => setView('report')}>
          <MessageSquarePlus size={18} />
          <span>Relatos</span>
        </button>
        <button type="button" className={view === 'profile' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => setView('profile')}>
          <UserRoundCheck size={18} />
          <span>Perfil</span>
        </button>
      </nav>
    </main>
  );
}

registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
