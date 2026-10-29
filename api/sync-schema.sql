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
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);

CREATE INDEX IF NOT EXISTS exam_dost_sync_devices_account_idx
  ON exam_dost_sync_devices(account_id, created_at);
ALTER TABLE exam_dost_sync_devices ADD COLUMN IF NOT EXISTS is_primary boolean NOT NULL DEFAULT false;
WITH oldest_device AS (
  SELECT device_id, account_id, row_number() OVER (PARTITION BY account_id ORDER BY created_at, device_id) AS position
  FROM exam_dost_sync_devices
)
UPDATE exam_dost_sync_devices AS device SET is_primary = true
FROM oldest_device
WHERE oldest_device.device_id = device.device_id AND oldest_device.position = 1
  AND NOT EXISTS (SELECT 1 FROM exam_dost_sync_devices current_primary WHERE current_primary.account_id = device.account_id AND current_primary.is_primary);

CREATE TABLE IF NOT EXISTS exam_dost_sync_pairings (
  session_id uuid PRIMARY KEY,
  request_credential_hash char(64) NOT NULL,
  new_device_credential_hash char(64) NOT NULL,
  label varchar(80) NOT NULL,
  expires_at timestamptz NOT NULL,
  public_key text,
  account_id uuid REFERENCES exam_dost_sync_accounts(account_id) ON DELETE CASCADE,
  device_id uuid REFERENCES exam_dost_sync_devices(device_id) ON DELETE SET NULL,
  key_envelope jsonb,
  pairing_code_hash char(64),
  pairing_attempts integer NOT NULL DEFAULT 0,
  approved_at timestamptz,
  claimed_at timestamptz,
  pin_from_primary boolean NOT NULL DEFAULT false
);

ALTER TABLE exam_dost_sync_pairings ADD COLUMN IF NOT EXISTS key_envelope jsonb;
ALTER TABLE exam_dost_sync_pairings ADD COLUMN IF NOT EXISTS public_key text;
ALTER TABLE exam_dost_sync_pairings ADD COLUMN IF NOT EXISTS pairing_code_hash char(64);
ALTER TABLE exam_dost_sync_pairings ADD COLUMN IF NOT EXISTS pairing_attempts integer NOT NULL DEFAULT 0;
ALTER TABLE exam_dost_sync_pairings ADD COLUMN IF NOT EXISTS claimed_at timestamptz;
ALTER TABLE exam_dost_sync_pairings ADD COLUMN IF NOT EXISTS pin_from_primary boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS exam_dost_sync_pairings_expiry_idx
  ON exam_dost_sync_pairings(expires_at);

CREATE TABLE IF NOT EXISTS exam_dost_sync_pairing_ip_limits (
  ip_hash char(64) PRIMARY KEY,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 0
);
