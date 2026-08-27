# In+

PWA em React + Vite para mapear lugares acessiveis, rotas seguras e relatos de barreiras. A base ja esta preparada para Cloudflare Pages Free e Cloudflare D1.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare

1. Autentique:

```bash
npm run cf:login
```

2. Crie o banco D1:

```bash
npm run cf:d1:create
```

3. Copie o `database_id` retornado e substitua `REPLACE_WITH_D1_DATABASE_ID` em `wrangler.toml`.

4. Aplique as migrations:

```bash
npm run cf:d1:migrate:remote
```

5. Gere o build e publique:

```bash
npm run build
npm run cf:deploy
```

## Git

Repositorio previsto:

```bash
git remote add origin git@github.com:Garcez7R/In-.git
git push -u origin main
```
