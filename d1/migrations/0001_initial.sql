CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  area TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  features TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'Em revisao',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place_name TEXT NOT NULL,
  barrier_type TEXT NOT NULL,
  details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'novo',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO places (name, kind, area, score, features, status) VALUES
  ('Estacao Central', 'Transporte', 'Centro', 96, '["rampa","elevador","piso tatil"]', 'Verificado'),
  ('Clinica Horizonte', 'Saude', 'Jardins', 91, '["guiche baixo","libras","banheiro acessivel"]', 'Verificado'),
  ('Biblioteca Viva', 'Cultura', 'Boa Vista', 84, '["entrada nivelada","rota ampla","audio apoio"]', 'Em revisao');
