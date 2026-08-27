export interface Env {
  DB: D1Database;
}

const fallbackPlaces = [
  {
    id: 1,
    name: 'Estacao Central',
    kind: 'Transporte',
    area: 'Centro',
    score: 96,
    features: ['rampa', 'elevador', 'piso tatil'],
    status: 'Verificado'
  },
  {
    id: 2,
    name: 'Clinica Horizonte',
    kind: 'Saude',
    area: 'Jardins',
    score: 91,
    features: ['guiche baixo', 'libras', 'banheiro acessivel'],
    status: 'Verificado'
  }
];

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const { results } = await env.DB.prepare(
      'SELECT id, name, kind, area, score, features, status FROM places ORDER BY score DESC LIMIT 25'
    ).all();

    return Response.json({
      places: results.map((place) => ({
        ...place,
        features: typeof place.features === 'string' ? JSON.parse(place.features) : []
      }))
    });
  } catch {
    return Response.json({ places: fallbackPlaces, source: 'fallback' });
  }
};
