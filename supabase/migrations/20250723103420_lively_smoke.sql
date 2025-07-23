/*
  # Initial QR Code Generator Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text, nullable)
      - `avatar_url` (text, nullable)
      - `subscription_tier` (enum: free, pro)
      - `subscription_status` (text, nullable)
      - `stripe_customer_id` (text, nullable)
      - `trial_ends_at` (timestamptz, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `qr_codes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `type` (enum: static, dynamic)
      - `qr_type` (text)
      - `short_code` (text, unique)
      - `destination_url` (text)
      - `original_data` (jsonb)
      - `customization` (jsonb)
      - `is_active` (boolean)
      - `scan_count` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `qr_scans`
      - `id` (uuid, primary key)
      - `qr_code_id` (uuid, references qr_codes)
      - `ip_address` (text, nullable)
      - `user_agent` (text, nullable)
      - `country` (text, nullable)
      - `city` (text, nullable)
      - `device_type` (text, nullable)
      - `browser` (text, nullable)
      - `os` (text, nullable)
      - `scanned_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Create indexes for performance
*/

-- Create custom types
CREATE TYPE subscription_tier AS ENUM ('free', 'pro');
CREATE TYPE qr_code_type AS ENUM ('static', 'dynamic');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_status text,
  stripe_customer_id text,
  trial_ends_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create qr_codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  type qr_code_type NOT NULL,
  qr_type text NOT NULL,
  short_code text UNIQUE NOT NULL,
  destination_url text NOT NULL,
  original_data jsonb DEFAULT '{}',
  customization jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  scan_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create qr_scans table
CREATE TABLE IF NOT EXISTS qr_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id uuid REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  ip_address text,
  user_agent text,
  country text,
  city text,
  device_type text,
  browser text,
  os text,
  scanned_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for qr_codes
CREATE POLICY "Users can read own QR codes"
  ON qr_codes
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own QR codes"
  ON qr_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own QR codes"
  ON qr_codes
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own QR codes"
  ON qr_codes
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Allow public read access to active QR codes for redirects
CREATE POLICY "Public can read active QR codes for redirects"
  ON qr_codes
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Create RLS policies for qr_scans
CREATE POLICY "Users can read scans for own QR codes"
  ON qr_scans
  FOR SELECT
  TO authenticated
  USING (
    qr_code_id IN (
      SELECT id FROM qr_codes WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert scan records"
  ON qr_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_code ON qr_codes(short_code);
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(type);
CREATE INDEX IF NOT EXISTS idx_qr_scans_qr_code_id ON qr_scans(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_scans_scanned_at ON qr_scans(scanned_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qr_codes_updated_at
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();