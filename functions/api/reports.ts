export interface Env {
  DB: D1Database;
}

type ReportPayload = {
  placeName?: string;
  barrierType?: string;
  details?: string;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const payload = (await request.json().catch(() => ({}))) as ReportPayload;
  const placeName = payload.placeName?.trim();
  const barrierType = payload.barrierType?.trim();
  const details = payload.details?.trim();

  if (!placeName || !barrierType || !details) {
    return Response.json({ error: 'Preencha local, tipo de barreira e detalhes.' }, { status: 400 });
  }

  await env.DB.prepare(
    'INSERT INTO reports (place_name, barrier_type, details, status, created_at) VALUES (?, ?, ?, ?, datetime("now"))'
  )
    .bind(placeName, barrierType, details, 'novo')
    .run();

  return Response.json({ ok: true }, { status: 201 });
};
