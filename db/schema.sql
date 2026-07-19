-- GreenMatch PostgreSQL schema
-- Note: policy thresholds and legal defaults should be reviewed by qualified counsel before production use.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Customer', 'Provider')),
  status TEXT NOT NULL CHECK (status IN ('Aktiv', 'Gesperrt')),
  registration_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('DE', 'EN')),
  verification_status TEXT NOT NULL CHECK (verification_status IN ('Ausweis', 'Bank', 'Pending')),
  tax_id TEXT,
  psttg_revenue_counter NUMERIC(12,2) NOT NULL DEFAULT 0,
  psttg_transaction_counter INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE parental_consent (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(user_id) ON DELETE CASCADE,
  parent_email TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  consent_stored BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ
);

CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Casual', 'Pro')),
  expected_budget NUMERIC(12,2),
  status TEXT NOT NULL CHECK (status IN ('Offen', 'Verhandelt', 'Aktiv', 'Beendet', 'Storniert')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bid_price NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Angeboten', 'Abgelehnt', 'Angenommen')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (gig_id, provider_id)
);

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL UNIQUE REFERENCES gigs(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  final_price NUMERIC(12,2) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Treuhand-Hinterlegt', 'Ausgezahlt', 'Einbehalten')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
  comment TEXT,
  rating_type TEXT NOT NULL CHECK (rating_type IN ('Customer-to-Provider', 'Provider-to-Customer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (contract_id, reviewer_id, recipient_id, rating_type)
);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (customer_id, provider_id)
);

CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_negotiations_gig_id ON negotiations(gig_id);
CREATE INDEX idx_contracts_provider_id ON contracts(provider_id);
CREATE INDEX idx_ratings_recipient_id ON ratings(recipient_id);
