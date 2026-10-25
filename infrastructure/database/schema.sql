-- ==============================================================================
-- CIDADÃO$ SUPER APP — RELATIONAL DATABASE SCHEMA (POSTGRESQL + POSTGIS)
-- Spec Section 10: Multi-tenant Domain Model, 15 Modules, Audit & RLS
-- Target: Manacapuru / AM & Multi-Municipal SaaS
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ------------------------------------------------------------------------------
-- 1. CORE & MULTI-TENANCY
-- ------------------------------------------------------------------------------

CREATE TABLE tenants (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(64) UNIQUE NOT NULL,
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE municipalities (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    ibge_code VARCHAR(7) UNIQUE NOT NULL,
    primary_color VARCHAR(16) DEFAULT '#009B4D',
    secondary_color VARCHAR(16) DEFAULT '#0756A6',
    boundary_geom GEOMETRY(MultiPolygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(32),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL DEFAULT 'cidadao',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    user_id UUID REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(64),
    payload JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. MÓDULO 01 — CITIZEN IDENTITY & MPUID
-- ------------------------------------------------------------------------------

CREATE TABLE citizens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    mpuid VARCHAR(32) UNIQUE NOT NULL, -- e.g. MPU-2026-884219
    full_name VARCHAR(255) NOT NULL,
    cpf_encrypted BYTEA NOT NULL,
    cpf_masked VARCHAR(14) NOT NULL,
    birth_date DATE NOT NULL,
    verified_tier VARCHAR(16) DEFAULT 'bronze', -- bronze, prata, ouro
    location_type VARCHAR(32) DEFAULT 'ribeirinha', -- urbana, rural, ribeirinha
    neighborhood_or_community VARCHAR(255) NOT NULL,
    address_line TEXT NOT NULL,
    geom GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE family_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guardian_citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE CASCADE,
    dependent_citizen_id UUID REFERENCES citizens(id) ON DELETE SET NULL,
    dependent_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(32) NOT NULL, -- filho, conjuge, pais, dependente
    birth_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. MÓDULO 02 — PUBLIC SERVICES & PROTOCOLS
-- ------------------------------------------------------------------------------

CREATE TABLE public_services (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    code VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    department VARCHAR(255) NOT NULL,
    sla_days INTEGER DEFAULT 5,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE service_protocols (
    id VARCHAR(64) PRIMARY KEY, -- e.g. PRT-2026-1042
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    citizen_id UUID NOT NULL REFERENCES citizens(id),
    service_id VARCHAR(64) NOT NULL REFERENCES public_services(id),
    description TEXT NOT NULL,
    location_description TEXT NOT NULL,
    location_geom GEOMETRY(Point, 4326),
    status VARCHAR(32) DEFAULT 'aberto',
    feedback_rating SMALLINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. MÓDULO 05 & 06 — MARKETPLACE & FOODPLACE
-- ------------------------------------------------------------------------------

CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    user_id UUID NOT NULL REFERENCES users(id),
    business_name VARCHAR(255) NOT NULL,
    type VARCHAR(32) NOT NULL, -- lojista, restaurante_flutuante, peixaria
    is_floating_river BOOLEAN DEFAULT FALSE,
    address_or_dock VARCHAR(255) NOT NULL,
    commission_rate_override NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(64) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    is_regional_origin BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE commercial_orders (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    citizen_id UUID NOT NULL REFERENCES citizens(id),
    total_amount NUMERIC(10,2) NOT NULL,
    freight_amount NUMERIC(10,2) DEFAULT 0,
    freight_modal VARCHAR(32) NOT NULL, -- courier, lancha_rapida, retirada
    platform_commission_amount NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(32) NOT NULL,
    status VARCHAR(32) DEFAULT 'criado',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. MÓDULO 07 & 08 — FRETES, PASSAGENS & MOBILIDADE FLUVIAL
-- ------------------------------------------------------------------------------

CREATE TABLE vessels_and_vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    transporter_user_id UUID NOT NULL REFERENCES users(id),
    name_or_plate VARCHAR(128) NOT NULL,
    type VARCHAR(32) NOT NULL, -- voadeira, barco_recreio, balsa, pickup, caminhao
    registration_code VARCHAR(64), -- Capitania dos Portos / DETRAN
    capacity_passengers INTEGER,
    capacity_kg NUMERIC(10,2)
);

CREATE TABLE freight_shipments (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    requester_citizen_id UUID NOT NULL REFERENCES citizens(id),
    vessel_id UUID REFERENCES vessels_and_vehicles(id),
    origin_dock VARCHAR(255) NOT NULL,
    destination_dock VARCHAR(255) NOT NULL,
    cargo_type VARCHAR(64) NOT NULL,
    weight_kg NUMERIC(10,2) NOT NULL,
    cost NUMERIC(10,2) NOT NULL,
    status VARCHAR(32) DEFAULT 'solicitado',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. MÓDULO 12 — WALLET MRT$, BENEFITS & REWARDS
-- ------------------------------------------------------------------------------

CREATE TABLE wallet_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    citizen_id UUID UNIQUE NOT NULL REFERENCES citizens(id),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id),
    mrt_points_balance INTEGER DEFAULT 0, -- Non-monetary promotional points
    restricted_benefit_balance NUMERIC(10,2) DEFAULT 0.00, -- Restricted municipal social fund
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallet_accounts(id),
    amount NUMERIC(10,2) NOT NULL,
    type VARCHAR(16) NOT NULL, -- credito, debito
    domain_type VARCHAR(32) NOT NULL, -- pontos_promocionais, beneficio_restrito, sandbox
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
