-- Add subscription tier tracking to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'starter';

-- Create subscription tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  price_monthly numeric,
  price_yearly numeric,
  max_projects integer,
  max_catalog_items integer,
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Insert tier configurations
INSERT INTO subscription_tiers (name, display_name, price_monthly, price_yearly, max_projects, max_catalog_items, features)
VALUES 
  ('starter', 'Starter (Free)', 0, 0, 5, 1000, '["Standard AR", "Watermarked exports", "1000+ items"]'::jsonb),
  ('creator', 'Creator (Professional)', 14.99, 149.99, -1, 50000, '["Unlimited projects", "50000+ items", "HD AR", "4K video export", "No ads/watermark"]'::jsonb),
  ('studio', 'Studio (Enterprise)', 49.99, 499.99, -1, -1, '["All Creator features", "Client management", "White-label export", "Team collaboration", "CAD export", "24/7 priority support"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Enable RLS on subscription_tiers
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read subscription tiers
CREATE POLICY "Anyone can view subscription tiers"
ON subscription_tiers FOR SELECT
USING (true);