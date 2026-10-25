# CIDADÃO$ — ARQUITETURA TÉCNICA E GOVERNANÇA INTEGRADA
**Versão:** 1.0 — Outubro de 2026  
**Projeto:** CIDADÃO$ — Super App Municipal para Municípios Amazônicos (Manacapuru / AM)

---

## 1. Visão Geral da Arquitetura
O **CIDADÃO$** é um Super App SaaS Multi-tenant desenhado para superar os desafios de conectividade e logística da Amazônia ocidental, combinando:
1. **Governo Digital:** MPUID (Identidade Digital Municipal), Serviços Públicos, Educação e Saúde Fluvial.
2. **Economia Digital:** Marketplace local, FoodPlace ribeirinho e Serviços Profissionais.
3. **Mobilidade & Logística:** Fretes terrestres/fluviais e Passagens em lanchas rápidas pelo Rio Solimões.
4. **Inteligência Territorial & Bioeconomia:** Rastreabilidade de farinha de Uarini, açaí, piscicultura e dashboards de BI.

---

## 2. Estrutura Monorepo e Separação de Responsabilidades
Conforme especificação (Seção 16):
```
cidadao-superapp/
├── apps/
│   ├── mobile/         # Aplicativo React Native com Expo SDK 58 e Expo Router
│   ├── admin-web/      # Painel da Empresa Operadora (Business Engine) e Gestão Municipal
│   └── api/            # Backend NestJS modular com PostgreSQL, PostGIS e Redis
├── packages/
│   ├── ui/             # CIDADÃO$ Design System
│   ├── theme/          # Tokens (#009B4D, #006B3C, #0756A6, #072F58, #FF8A00, #FFC43D)
│   ├── types/          # Contratos de domínio TypeScript
│   ├── validation/     # Schemas de validação Zod
│   └── api-client/     # Cliente REST com interceptores e cache offline
├── infrastructure/
│   ├── database/       # Migrations SQL e scripts PostGIS
│   └── docker/         # Docker Compose local
└── docs/               # Documentação técnica de arquitetura, módulos e requisitos
```

---

## 3. Estratégia Offline-First na Calha Amazônica
A conectividade na bacia do Solimões alterna entre 4G/Starlink nos centros urbanos e sombra de sinal em igarapés e comunidades remotas:
- **Camada de Cache Local:** Leituras de carteira, horários de lanchas, escolas e cardápios são persistidas no dispositivo.
- **Fila de Sincronização Assíncrona:** Abertura de protocolos, pedidos de compra e registros de pets entram na fila `pending` e são despachados quando o sinal é restabelecido com chave de idempotência.
- **Segregação Financeira:** Pagamentos e reservas concorrentes de assento exigem confirmação online no backend ou permanecem explicitamente sinalizados como `estágio pendente`.

---

## 4. Governança de Dados e LGPD
- **Segregação Rigorosa:** Dados públicos, clínicos de saúde e escolares são mantidos isolados da camada comercial.
- **Minimização de Dados:** CPF mascarado na interface; trânsito cifrado em TLS 1.3 e repouso cifrado com AES-256.
- **Aviso Clínico:** Prescrições e diagnósticos médicos automatizados por IA são estritamente vetados.
