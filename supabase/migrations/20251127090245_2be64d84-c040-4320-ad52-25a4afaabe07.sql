-- Update subscription tiers to yearly plans with premium pricing
-- Remove free tier completely

-- Clear existing tiers
DELETE FROM subscription_tiers;

-- Add new yearly premium tiers
INSERT INTO subscription_tiers (name, display_name, price_yearly, max_projects, max_catalog_items, features) VALUES
('professional', 'Professional Studio', 2399.00, NULL, NULL, 
  '["8K Resolution Output", "Game Development Engine", "Advanced 3D Modeling", "Material Editor", "Model Import/Export (FBX, OBJ, GLTF)", "AI Design Assistant", "Real-time Ray Tracing", "Physics Simulation", "Animation Tools", "Unlimited Cloud Storage", "Priority Support", "30-Day Free Trial"]'::jsonb),
('enterprise', 'Enterprise Studio', 9999.00, NULL, NULL, 
  '["Everything in Professional", "AAA Game Development Tools", "Advanced AI Code Generation", "Multi-user Collaboration", "Custom Shader Editor", "Motion Capture Integration", "Procedural Generation Tools", "Advanced Physics Engine", "Dedicated Account Manager", "Custom Training Sessions", "SLA Guarantee", "White Label Options"]'::jsonb);
