# InPlus — Plataforma de Acesso Inclusivo

> Uma plataforma tecnológica criada para reduzir barreiras de acessibilidade e ajudar pessoas a circular por espaços físicos com mais autonomia, confiança e previsibilidade.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)]()
[![Platform](https://img.shields.io/badge/platform-PWA-green)]()
[![Cloud](https://img.shields.io/badge/cloud-Cloudflare-orange)]()
[![Database](https://img.shields.io/badge/database-D1-aqua)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

Idiomas: **Português (principal)** · [English](#english) · [Español](#español)

---

## Sobre o Projeto

**InPlus** é uma plataforma colaborativa de acessibilidade que ajuda pessoas a descobrir lugares de acordo com suas necessidades reais de acesso.

Mapas tradicionais respondem:

> "Onde fica este lugar?"

InPlus busca responder:

> "Eu consigo acessar este lugar com segurança, conforto e previsibilidade?"

A plataforma nasce de um desafio cotidiano: muitas pessoas precisam de informações específicas antes de sair de casa, mas esses dados costumam ser incompletos, indisponíveis ou pouco confiáveis.

InPlus transforma experiências da comunidade em dados estruturados de acessibilidade.

---

## Visão de Produto

Criar uma camada digital de acessibilidade sobre ambientes físicos, conectando pessoas a lugares que apoiem melhor suas necessidades.

A plataforma se orienta por:

- transparência sobre acessibilidade;
- informação construída pela comunidade;
- design inclusivo;
- autonomia do usuário;
- tecnologia com privacidade desde a concepção.

---

## MVP Atual

A primeira versão do InPlus é um Progressive Web App focado em mapear lugares acessíveis, validar condições de acessibilidade e coletar relatos da comunidade.

Este MVP inclui:

- interface responsiva em React;
- estrutura instalável de PWA;
- service worker com suporte offline;
- descoberta de lugares acessíveis;
- fluxo de relato de barreiras;
- base de deploy para Cloudflare Pages;
- schema inicial com Cloudflare D1;
- endpoints serverless via Cloudflare Pages Functions.

---

## Funcionalidades Principais

### Descoberta de Acessibilidade

Usuários podem explorar locais com base em necessidades como:

- banheiros acessíveis;
- recursos de mobilidade;
- estrutura adequada para pessoas ostomizadas;
- infraestrutura de apoio familiar;
- aspectos sensoriais;
- acessibilidade visual e auditiva.

### Relatos da Comunidade

Pessoas podem registrar barreiras de acessibilidade e contribuir com informações práticas sobre os lugares que visitam.

Esses relatos podem apoiar:

- correções;
- validação de acessibilidade;
- acompanhamento de melhorias locais;
- níveis de confiança da comunidade.

### Confiança de Acesso

Cada lugar pode evoluir de um simples ponto no mapa para um perfil estruturado de acessibilidade, combinando contribuições, status de validação e detalhes práticos.

---

## Módulo InPlus Stoma

### Acessibilidade para pessoas que vivem com ostomia

O primeiro módulo especializado da plataforma.

Muitas soluções de acessibilidade olham apenas para mobilidade. Porém, existem necessidades menos visíveis e igualmente importantes.

O módulo InPlus Stoma foca em informações como:

- disponibilidade de banheiros adequados;
- privacidade;
- espaço para troca;
- experiências de usuários;
- nível de confiança de acessibilidade.

O objetivo é simples:

> Ajudar pessoas a sair de casa com mais confiança.

---

## Módulos da Plataforma

### Disponíveis

#### Mapa de Acessibilidade

Experiência central de descoberta:

- localização de lugares;
- informações de acessibilidade;
- avaliações da comunidade;
- detalhes do ambiente.

#### Contribuições de Usuários

Usuários podem contribuir com:

- envio de locais;
- avaliação de condições de acessibilidade;
- relato de barreiras;
- sugestões de correção.

### Planejados

#### InPlus Mobility

Acessibilidade física:

- rampas;
- elevadores;
- estacionamento acessível;
- informações estruturais.

#### InPlus Family

Acessibilidade para famílias:

- fraldários;
- salas de amamentação;
- infraestrutura familiar.

#### InPlus Sense

Acessibilidade sensorial:

- ambientes silenciosos;
- baixa estimulação;
- locais sensorialmente amigáveis.

#### InPlus Vision

Acessibilidade visual:

- piso tátil;
- informação em Braille;
- recursos de orientação.

#### InPlus Sign

Acessibilidade auditiva:

- suporte em Libras ou língua de sinais local;
- comunicação visual;
- recursos para atendimento inclusivo.

---

## Arquitetura

O MVP foi desenhado com uma abordagem serverless-first, priorizando baixo custo operacional, iteração rápida, escalabilidade e simplicidade.

### Frontend

- React
- TypeScript
- Vite
- Progressive Web App
- Lucide React icons

### Cloud

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare D1

### Integrações Planejadas

- Cloudflare R2 para armazenamento de mídia
- Google OAuth para autenticação
- OpenStreetMap e Leaflet para visualização de mapa

---

## Modelo de Dados

### Place

Representa um lugar acessível.

Contém:

- nome;
- categoria;
- área;
- pontuação de acessibilidade;
- lista de recursos;
- status de validação.

### Report

Representa um relato da comunidade.

Contém:

- nome do lugar;
- tipo de barreira;
- detalhes;
- status;
- data de criação.

### Accessibility Profile

Informação futura estruturada de acessibilidade:

- mobilidade;
- ostomia;
- família;
- sensorial;
- visual;
- auditiva.

### Review

Validação futura gerada pela comunidade:

- avaliações;
- comentários;
- fotos;
- data da visita.

---

## Identidade Visual

A identidade InPlus combina tecnologia, cuidado e inclusão.

### Paleta de Cores

| Token | HEX | Papel |
|---|---:|---|
| InPlus Blue | `#033079` | Confiança, navegação, textos fortes e estrutura principal. |
| InPlus Aqua | `#20CDC8` | Ações positivas, sinais de acessibilidade e cuidado. |
| InPlus Violet | `#6C50EA` | Inovação, estados ativos e destaques selecionados. |
| InPlus White | `#FFFFFF` | Clareza, respiro visual e contraste acessível. |

A interface usa branco como fundo principal, azul profundo como estrutura de confiança e verde-água como cor principal de ação. O violeta aparece com moderação como destaque secundário.

---

## Privacidade e Segurança

Dados de acessibilidade podem envolver contextos pessoais sensíveis.

O projeto segue princípios de privacidade desde a concepção:

- coleta mínima de dados;
- consentimento explícito;
- perfis protegidos;
- tratamento responsável de informações pessoais;
- arquitetura orientada à LGPD.

---

## Roadmap

### Inteligência Artificial

Aplicações potenciais:

- extração de informações de acessibilidade;
- classificação assistida por imagem;
- resumo de avaliações;
- recomendações personalizadas.

### Inteligência Comunitária

Possibilidades futuras:

- contribuidores verificados;
- reputação de acessibilidade;
- parcerias com locais públicos e privados;
- relatórios e analytics de acessibilidade.

### Expansão do Produto

Próximas camadas:

- autenticação;
- filtros avançados;
- favoritos;
- reputação de contribuidores;
- mapa real;
- upload de mídia;
- módulos adicionais de acessibilidade.

---

## Deploy

O projeto está preparado para publicação em Cloudflare Pages com Cloudflare D1.

Fluxo esperado:

```bash
npm run cf:login
npm run cf:d1:create
```

Depois, o `database_id` criado deve substituir `REPLACE_WITH_D1_DATABASE_ID` em `wrangler.toml`.

```bash
npm run cf:d1:migrate:remote
npm run build
npm run cf:deploy
```

O Wrangler atual exige Node.js 22 ou superior.

---

## Por que InPlus?

O símbolo "+" representa expansão:

- mais acesso;
- mais autonomia;
- mais informação;
- mais dignidade;
- mais possibilidades.

InPlus não é apenas sobre encontrar lugares.

É sobre ajudar pessoas a sentir que pertencem a esses lugares.

---

## Status do Projeto

Em desenvolvimento ativo.

Construindo uma plataforma de acessibilidade onde software encontra necessidades humanas reais.

---

# English

## InPlus — Inclusive Access Platform

> A technology platform designed to reduce accessibility barriers and help people navigate physical spaces with more autonomy, confidence and predictability.

## About the Project

**InPlus** is a collaborative accessibility platform that helps people discover places according to their specific accessibility needs.

Traditional maps can answer:

> "Where is this place?"

InPlus aims to answer:

> "Can I safely and comfortably access this place?"

The platform was created from a real-world accessibility challenge: many people need additional information before leaving home, but this information is often unavailable, incomplete or unreliable.

InPlus transforms community experiences into structured accessibility data.

## Product Vision

Create a digital accessibility layer over physical environments, connecting people with places that better support their needs.

The platform focuses on accessibility transparency, community-driven information, inclusive design, user autonomy and privacy-conscious technology.

## Current MVP

The first version of InPlus is a Progressive Web App focused on mapping accessible places, validating accessibility conditions and collecting community reports.

This MVP includes a responsive React interface, installable PWA structure, offline-ready service worker, accessibility discovery, community reporting, Cloudflare Pages deployment setup, Cloudflare D1 schema and serverless API endpoints.

## Core Features

### Accessibility Discovery

Users can explore locations based on accessible restrooms, mobility resources, ostomy-friendly facilities, family support infrastructure, sensory considerations, and visual or hearing accessibility.

### Community Reports

People can register accessibility barriers and contribute practical information about places they visit.

### Accessibility Confidence

Each place can evolve from a simple location record into a structured accessibility profile, combining community input, validation status and practical details.

## InPlus Stoma Module

The first specialized module of the platform focuses on accessibility for people living with ostomy.

It considers suitable restrooms, privacy conditions, changing space, user experiences and accessibility confidence level.

> Help people leave home with more confidence.

## Architecture

The MVP is designed with a serverless-first approach, prioritizing low operational cost, rapid iteration, scalability and simplicity.

Frontend:

- React
- TypeScript
- Vite
- Progressive Web App
- Lucide React icons

Cloud:

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare D1

Planned integrations:

- Cloudflare R2
- Google OAuth
- OpenStreetMap and Leaflet

## Privacy & Security

Accessibility data can involve sensitive personal contexts.

The project follows privacy-by-design principles: minimal data collection, explicit user consent, protected profiles, responsible handling of personal information and LGPD-oriented architecture.

## Roadmap

Future platform layers include authentication, advanced filters, favorites, contributor reputation, real map experience, media uploads, AI capabilities, institutional partnerships and additional accessibility modules.

## Why InPlus?

The "+" represents more access, more autonomy, more information, more dignity and more possibilities.

InPlus is not only about finding places. It is about helping people feel confident that they belong in those places.

## Project Status

Under active development.

Building an accessibility-focused technology platform where software meets human needs.

---

# Español

## InPlus — Plataforma de Acceso Inclusivo

> Una plataforma tecnológica creada para reducir barreras de accesibilidad y ayudar a las personas a moverse por espacios físicos con más autonomía, confianza y previsibilidad.

## Sobre el Proyecto

**InPlus** es una plataforma colaborativa de accesibilidad que ayuda a las personas a descubrir lugares según sus necesidades reales de acceso.

Los mapas tradicionales pueden responder:

> "¿Dónde está este lugar?"

InPlus busca responder:

> "¿Puedo acceder a este lugar con seguridad, comodidad y previsibilidad?"

La plataforma nace de un desafío cotidiano: muchas personas necesitan información específica antes de salir de casa, pero esos datos suelen ser incompletos, inexistentes o poco confiables.

InPlus transforma experiencias de la comunidad en datos estructurados de accesibilidad.

## Visión de Producto

Crear una capa digital de accesibilidad sobre entornos físicos, conectando personas con lugares que apoyen mejor sus necesidades.

La plataforma se enfoca en transparencia de accesibilidad, información construida por la comunidad, diseño inclusivo, autonomía del usuario y tecnología consciente de la privacidad.

## MVP Actual

La primera versión de InPlus es una Progressive Web App enfocada en mapear lugares accesibles, validar condiciones de accesibilidad y recopilar reportes de la comunidad.

Este MVP incluye interfaz responsiva en React, estructura instalable de PWA, service worker con soporte offline, descubrimiento de lugares accesibles, flujo de reporte de barreras, configuración para Cloudflare Pages, schema con Cloudflare D1 y endpoints serverless.

## Funcionalidades Principales

### Descubrimiento de Accesibilidad

Los usuarios pueden explorar lugares según baños accesibles, recursos de movilidad, instalaciones adecuadas para personas ostomizadas, infraestructura familiar, aspectos sensoriales y accesibilidad visual o auditiva.

### Reportes de la Comunidad

Las personas pueden registrar barreras de accesibilidad y contribuir información práctica sobre los lugares que visitan.

### Confianza de Acceso

Cada lugar puede evolucionar de un simple punto en el mapa a un perfil estructurado de accesibilidad, combinando aportes de la comunidad, estado de validación y detalles prácticos.

## Módulo InPlus Stoma

El primer módulo especializado de la plataforma se enfoca en accesibilidad para personas que viven con ostomía.

Considera baños adecuados, condiciones de privacidad, espacio para cambio, experiencias de usuarios y nivel de confianza de accesibilidad.

> Ayudar a las personas a salir de casa con más confianza.

## Arquitectura

El MVP fue diseñado con un enfoque serverless-first, priorizando bajo costo operativo, iteración rápida, escalabilidad y simplicidad.

Frontend:

- React
- TypeScript
- Vite
- Progressive Web App
- Lucide React icons

Cloud:

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare D1

Integraciones previstas:

- Cloudflare R2
- Google OAuth
- OpenStreetMap y Leaflet

## Privacidad y Seguridad

Los datos de accesibilidad pueden involucrar contextos personales sensibles.

El proyecto sigue principios de privacidad desde el diseño: recolección mínima de datos, consentimiento explícito, perfiles protegidos, manejo responsable de información personal y arquitectura orientada a LGPD.

## Roadmap

Las próximas capas de la plataforma incluyen autenticación, filtros avanzados, favoritos, reputación de contribuidores, experiencia real de mapa, carga de medios, capacidades de IA, alianzas institucionales y módulos adicionales de accesibilidad.

## ¿Por qué InPlus?

El "+" representa más acceso, más autonomía, más información, más dignidad y más posibilidades.

InPlus no se trata solo de encontrar lugares. Se trata de ayudar a las personas a sentir que pertenecen a esos lugares.

## Estado del Proyecto

En desarrollo activo.

Construyendo una plataforma de accesibilidad donde el software encuentra necesidades humanas reales.
