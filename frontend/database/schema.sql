-- packEZ Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- wilayah table
CREATE TABLE wilayah (
  id serial PRIMARY KEY,
  nama_wilayah text NOT NULL,
  kode_wilayah text,
  created_at timestamptz DEFAULT now()
);

-- users table (for authentication)
CREATE TABLE users_packez (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text CHECK (role IN ('admin','kurir')) NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- karung table
CREATE TABLE karung (
  id serial PRIMARY KEY,
  nama_karung text NOT NULL,
  wilayah_id int REFERENCES wilayah(id),
  kurir_id uuid REFERENCES users_packez(id),
  jadwal_pengambilan timestamptz,
  deskripsi text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- produk table
CREATE TABLE produk (
  id serial PRIMARY KEY,
  karung_id int REFERENCES karung(id) ON DELETE CASCADE,
  nama_paket text NOT NULL,
  nama_pemesan text NOT NULL,
  alamat text NOT NULL,
  foto_url text,
  status text CHECK (status IN ('pending','on_route','delivered')) DEFAULT 'pending',
  tanggal_ditambahkan timestamptz DEFAULT now(),
  scanning_time timestamptz,
  detail jsonb
);

-- history table
CREATE TABLE history_pengiriman (
  id serial PRIMARY KEY,
  produk_id int REFERENCES produk(id) ON DELETE CASCADE,
  kurir_id uuid REFERENCES users_packez(id),
  waktu_action timestamptz DEFAULT now(),
  aksi text NOT NULL,
  bukti_url text
);

-- Create indexes for better performance
CREATE INDEX idx_karung_wilayah ON karung(wilayah_id);
CREATE INDEX idx_karung_kurir ON karung(kurir_id);
CREATE INDEX idx_produk_karung ON produk(karung_id);
CREATE INDEX idx_produk_status ON produk(status);
CREATE INDEX idx_history_produk ON history_pengiriman(produk_id);
CREATE INDEX idx_history_kurir ON history_pengiriman(kurir_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for karung table
CREATE TRIGGER update_karung_updated_at 
    BEFORE UPDATE ON karung 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE wilayah ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_packez ENABLE ROW LEVEL SECURITY;
ALTER TABLE karung ENABLE ROW LEVEL SECURITY;
ALTER TABLE produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_pengiriman ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your security requirements)
-- For now, we'll allow all operations for authenticated users
-- In production, you should create more restrictive policies

CREATE POLICY "Allow all for authenticated users" ON wilayah
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON users_packez
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON karung
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON produk
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON history_pengiriman
    FOR ALL USING (auth.role() = 'authenticated');
