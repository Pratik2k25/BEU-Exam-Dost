CREATE TABLE IF NOT EXISTS exam_dost_sync_accounts (
  account_id uuid PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  revision bigint NOT NULL DEFAULT 1 CHECK (revision > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exam_dost_sync_devices (
  device_id uuid PRIMARY KEY,
  account_id uuid NOT NULL REFERENCES exam_dost_sync_accounts(account_id) ON DELETE CASCADE,
  credential_hash char(64) NOT NULL UNIQUE,
  label varchar(80) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);

CREATE INDEX IF NOT EXISTS exam_dost_sync_devices_account_idx
  ON exam_dost_sync_devices(account_id, created_at);

CREATE TABLE IF NOT EXISTS exam_dost_sync_pairings (
  session_id uuid PRIMARY KEY,
  request_credential_hash char(64) NOT NULL,
  new_device_credential_hash char(64) NOT NULL,
  label varchar(80) NOT NULL,
  expires_at timestamptz NOT NULL,
  account_id uuid REFERENCES exam_dost_sync_accounts(account_id) ON DELETE CASCADE,
  device_id uuid REFERENCES exam_dost_sync_devices(device_id) ON DELETE SET NULL,
  approved_at timestamptz
);

CREATE INDEX IF NOT EXISTS exam_dost_sync_pairings_expiry_idx
  ON exam_dost_sync_pairings(expires_at);
