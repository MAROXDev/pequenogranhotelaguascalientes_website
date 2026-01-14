-- Create policies table
CREATE TABLE IF NOT EXISTS hotel_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_percentage INTEGER,
  discount_amount DECIMAL(10,2),
  image_url TEXT,
  valid_from DATE,
  valid_until DATE,
  terms TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS hotel_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  is_included BOOLEAN DEFAULT true,
  additional_cost DECIMAL(10,2),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create loyalty program table
CREATE TABLE IF NOT EXISTS loyalty_program (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  benefits TEXT[] NOT NULL,
  discount_percentage INTEGER,
  icon TEXT,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expand rooms table with more details
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS room_type TEXT DEFAULT 'standard';
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS size_sqm INTEGER;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS bed_type TEXT;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS view_type TEXT;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS floor INTEGER;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS available_count INTEGER DEFAULT 1;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS features TEXT[];

-- Create room images table for multiple photos per room
CREATE TABLE IF NOT EXISTS room_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  room_id UUID REFERENCES rooms(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_count INTEGER NOT NULL,
  special_requests TEXT,
  total_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  confirmation_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE hotel_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_program ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Public read access for policies"
  ON hotel_policies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for offers"
  ON offers FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public read access for services"
  ON hotel_services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for loyalty"
  ON loyalty_program FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for room images"
  ON room_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public insert for reservations"
  ON reservations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public read own reservations"
  ON reservations FOR SELECT
  TO public
  USING (true);

-- Create RLS policies for admin write access
CREATE POLICY "Admin full access to policies"
  ON hotel_policies FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

CREATE POLICY "Admin full access to offers"
  ON offers FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

CREATE POLICY "Admin full access to services"
  ON hotel_services FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

CREATE POLICY "Admin full access to loyalty"
  ON loyalty_program FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

CREATE POLICY "Admin full access to room images"
  ON room_images FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

CREATE POLICY "Admin full access to reservations"
  ON reservations FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX idx_offers_active ON offers(is_active);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX idx_room_images_room ON room_images(room_id);
