# CIDADÃO$ — MATRIZ DE REQUISITOS E STATUS DOS 15 MÓDULOS
**Versão:** 1.0 — Outubro de 2026  
**Território Piloto:** Município de Manacapuru / AM  
**Status de Entrega:** Etapa 1 (Fundação) & Etapa 2 (Núcleo Comercial Prioritário) Concluídas

---

| Nº | Identificador | Módulo | Status | Descrição da Entrega Funcional |
|---|---|---|---|---|
| 01 | `citizen-identity` | Cadastro e Identidade do Cidadão (MPUID) | **Implementado** | Cadastro único, Cartão Digital com QR Code dinâmico, Nível Ouro, Rede Familiar e LGPD. |
| 02 | `public-services` | Atendimento e Serviços Públicos | **Implementado** | Catálogo de serviços, abertura de protocolos reais, acompanhamento de SLA e avaliação. |
| 03 | `education` | Educação Municipal | **Implementado** | Escolas urbanas e ribeirinhas, acompanhamento de lanchas escolares fluviais, boletim e merenda. |
| 04 | `health` | Saúde & UBS Fluvial | **Implementado** | Agendamento na UBS Fluvial Walter Góes, carteira de vacinação do SUS e aviso de governança médica. |
| 05 | `marketplace` | Marketplace / Shopping Local | **Implementado (Núcleo Prioritário)** | Lojas de Manacapuru, catálogo, carrinho dinâmico, checkout com modais fluviais e pagamento sandbox. |
| 06 | `foodplace` | FoodPlace / FoodCourt Ribeirinho | **Implementado (Núcleo Prioritário)** | Restaurantes flutuantes, pratos regionais (tambaqui, pirarucu, tacacá), pedidos e reserva de mesas. |
| 07 | `freight` | Fretes & Logística Fluvial/Terrestre | **Implementado (Núcleo Prioritário)** | Cotações dinâmicas de voadeiras e pickups, rastreamento intermitente com etapas no Rio Solimões. |
| 08 | `tickets-mobility` | Passagens & Mobilidade | **Implementado** | Horários de lanchas rápidas para Manaus, seleção interativa de assentos e bilhete digital. |
| 09 | `professional-services` | Serviços Profissionais | **Implementado** | Mecânicos de popa, carpinteiros navais e eletricistas solares com solicitação de orçamento. |
| 10 | `tourism-gastronomy` | Turismo & Guia Gastronômico | **Implementado** | Cirandódromo de Manacapuru, Balneário do Miriti, orla do Solimões e receitas típicas amazônicas. |
| 11 | `agro-bioeconomy` | Agro e Bioeconomia | **Implementado** | Mercado direto do produtor (farinha de Uarini, açaí, piscicultura) e rastreabilidade de origem. |
| 12 | `wallet-rewards` | Carteira Digital / MRT$ / Recompensas | **Implementado** | 3 domínios segregados (pontos promocionais, benefício restrito e sandbox fiat), QR pay e extrato. |
| 13 | `biduga` | Biduga — Módulo Pet Municipal | **Implementado** | Cadastro de animais domésticos com microchip municipal, vacinas antirrábicas e galeria de adoção. |
| 14 | `territorial-intelligence` | BI, Dados & Inteligência Territorial | **Implementado** | Indicadores demográficos, de saúde e logística com mapa georreferenciado de Manacapuru. |
| 15 | `advertising` | Publicidade e Anúncios Locais | **Implementado** | Classificados do comércio, oportunidades de emprego locais e criação de campanhas. |
| — | `business-engine` | CIDADÃO$ Business Engine (Admin) | **Implementado** | Painel da empresa operadora com parametrização de comissões, planos comerciais e conciliação D+1. |

---

## Legenda de Conformidade Técnica
- **Implementado:** Navegação funcional, formulários com validação, persistência local/SQLite simulado, tratamento de erros e integração ao Design System.
- **Demonstrativo / Sandbox:** Transações financeiras, PIX e consultas externas sinalizadas como sandbox e sem expor dados fictícios como oficiais.
