# In+ — Inclusive Access Platform

> A technology platform designed to reduce accessibility barriers and help people navigate physical spaces with more autonomy, confidence and predictability.

[![Status](https://img.shields.io/badge/status-development-blue)]()
[![Platform](https://img.shields.io/badge/platform-PWA-green)]()
[![Cloud](https://img.shields.io/badge/cloud-Cloudflare-orange)]()
[![Database](https://img.shields.io/badge/database-D1-aqua)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

---

## About the Project

**In+** is a collaborative accessibility platform that helps people discover places according to their specific accessibility needs.

Traditional maps can answer:

> "Where is this place?"

In+ aims to answer:

> "Can I safely and comfortably access this place?"

The platform was created from a real-world accessibility challenge: many people need additional information before leaving home, but this information is often unavailable, incomplete or unreliable.

In+ transforms community experiences into structured accessibility data.

---

## Product Vision

Create a digital accessibility layer over physical environments, connecting people with places that better support their needs.

The platform focuses on:

- accessibility transparency;
- community-driven information;
- inclusive design;
- user autonomy;
- privacy-conscious technology.

---

## Current MVP

The first version of In+ is a Progressive Web App focused on mapping accessible places, validating accessibility conditions and collecting community reports.

This MVP includes:

- responsive React interface;
- installable PWA structure;
- offline-ready service worker;
- accessibility place discovery;
- community report flow;
- Cloudflare Pages deployment setup;
- Cloudflare D1 database schema;
- serverless API endpoints through Cloudflare Pages Functions.

---

## Core Features

### Accessibility Discovery

Users can explore locations based on accessibility requirements:

- accessible restrooms;
- mobility resources;
- ostomy-friendly facilities;
- family support infrastructure;
- sensory considerations;
- visual and hearing accessibility.

### Community Reports

People can register accessibility barriers and contribute practical information about places they visit.

Reports can support:

- corrections;
- accessibility verification;
- local improvement tracking;
- community confidence scores.

### Accessibility Confidence

Each place can evolve from a simple location record into a structured accessibility profile, combining community input, validation status and practical details.

---

## In+ Stoma Module

### Accessibility for people living with ostomy

The first specialized module of the platform.

Many accessibility solutions focus exclusively on mobility. However, there are other accessibility requirements that are less visible but equally important.

The In+ Stoma module focuses on information such as:

- availability of suitable restrooms;
- privacy conditions;
- changing space;
- user experiences;
- accessibility confidence level.

The goal is simple:

> Help people leave home with more confidence.

---

## Platform Modules

### Available

#### Accessibility Map

Core mapping experience:

- location discovery;
- accessibility information;
- community reviews;
- local details.

#### User Contributions

Users can contribute by:

- submitting locations;
- reviewing accessibility conditions;
- reporting barriers;
- suggesting corrections.

---

## Planned Modules

### In+ Mobility

Physical accessibility:

- ramps;
- elevators;
- accessible parking;
- structural accessibility information.

### In+ Family

Family-oriented accessibility:

- changing rooms;
- nursing spaces;
- family facilities.

### In+ Sense

Sensory accessibility:

- quiet environments;
- reduced stimulation;
- sensory-friendly locations.

### In+ Vision

Visual accessibility:

- tactile flooring;
- Braille information;
- accessibility resources.

### In+ Sign

Hearing accessibility:

- sign language support;
- visual communication resources.

---

## Architecture

The MVP is designed with a serverless-first approach, prioritizing low operational cost, rapid iteration, scalability and simplicity.

### Frontend

- React
- TypeScript
- Vite
- Progressive Web App
- Lucide React icons

### Cloud Platform

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare D1

### Planned Integrations

- Cloudflare R2 for media storage
- Google OAuth for authentication
- OpenStreetMap and Leaflet for map visualization

---

## Data Model

### Place

Represents an accessible place.

Contains:

- name;
- category;
- area;
- accessibility score;
- feature list;
- validation status.

### Report

Represents a community-generated accessibility report.

Contains:

- place name;
- barrier type;
- details;
- status;
- creation date.

### Accessibility Profile

Future structured accessibility information:

- mobility;
- ostomy;
- family;
- sensory;
- visual;
- hearing.

### Review

Future community-generated validation:

- ratings;
- comments;
- photos;
- visit date.

---

## Brand System

The In+ identity combines technology, care and inclusion.

### Color Palette

| Token | HEX | Role |
|---|---:|---|
| In+ Blue | `#033079` | Trust, navigation, strong text and primary structure. |
| In+ Aqua | `#20CDC8` | Positive actions, accessibility signals and care. |
| In+ Violet | `#6C50EA` | Innovation, active states and selected highlights. |
| In+ White | `#FFFFFF` | Clarity, breathing room and accessible contrast. |

The interface uses white as the main background, deep blue for high-confidence structure and aqua as the main action color. Violet appears with moderation as a secondary innovation accent.

---

## Privacy & Security

Accessibility data can involve sensitive personal contexts.

The project follows privacy-by-design principles:

- minimal data collection;
- explicit user consent;
- protected profiles;
- responsible handling of personal information;
- LGPD-oriented architecture.

---

## Future Roadmap

### Artificial Intelligence

Potential applications:

- accessibility information extraction;
- image-assisted classification;
- review summarization;
- personalized recommendations.

### Community Intelligence

Future possibilities:

- verified contributors;
- accessibility reputation;
- partnerships with public and private places;
- accessibility reports and analytics.

### Product Expansion

Next platform layers:

- authentication;
- advanced filters;
- favorites;
- contributor reputation;
- real map experience;
- media uploads;
- additional accessibility modules.

---

## Development Strategy

### Phase 1 — MVP

Goal: validate the core accessibility experience.

Deliver:

- accessibility-first interface;
- location database;
- community reports;
- Cloudflare deployment foundation;
- In+ Stoma module direction.

### Phase 2 — Expansion

Add:

- authentication;
- advanced filters;
- favorites;
- user profiles;
- contributor reputation;
- photo uploads.

### Phase 3 — Platform Growth

Explore:

- AI capabilities;
- institutional partnerships;
- accessibility analytics;
- broader community adoption.

---

## Why In+?

The "+" represents expansion:

- more access;
- more autonomy;
- more information;
- more dignity;
- more possibilities.

In+ is not only about finding places.

It is about helping people feel confident that they belong in those places.

---

## Project Status

Under active development.

Building an accessibility-focused technology platform where software meets human needs.
