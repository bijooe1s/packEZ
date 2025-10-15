-- packEZ Seed Data
-- Run this after creating the schema

-- Insert wilayah data
INSERT INTO wilayah (nama_wilayah, kode_wilayah) VALUES
('Jakarta Pusat', 'JKT-01'),
('Jakarta Selatan', 'JKT-02'),
('Jakarta Utara', 'JKT-03'),
('Jakarta Barat', 'JKT-04'),
('Jakarta Timur', 'JKT-05'),
('Bogor', 'BGR-01'),
('Depok', 'DPK-01'),
('Tangerang', 'TNG-01'),
('Bekasi', 'BKS-01');

-- Insert users data
INSERT INTO users_packez (id, username, full_name, role, email, phone) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin', 'Admin PackEZ', 'admin', 'admin@packez.com', '+6281234567891'),
('550e8400-e29b-41d4-a716-446655440001', 'kurir', 'Kurir PackEZ', 'kurir', 'kurir@packez.com', '+6281234567890'),
('550e8400-e29b-41d4-a716-446655440002', 'kurir2', 'Kurir Jakarta Selatan', 'kurir', 'kurir2@packez.com', '+6281234567892'),
('550e8400-e29b-41d4-a716-446655440003', 'kurir3', 'Kurir Jakarta Utara', 'kurir', 'kurir3@packez.com', '+6281234567893');

-- Insert karung data
INSERT INTO karung (nama_karung, wilayah_id, kurir_id, jadwal_pengambilan, deskripsi) VALUES
('Karung Jakarta Pusat - Pagi', 1, '550e8400-e29b-41d4-a716-446655440001', now() + interval '1 day', 'Paket untuk wilayah Jakarta Pusat - shift pagi'),
('Karung Jakarta Pusat - Siang', 1, '550e8400-e29b-41d4-a716-446655440001', now() + interval '1 day' + interval '6 hours', 'Paket untuk wilayah Jakarta Pusat - shift siang'),
('Karung Jakarta Selatan - Pagi', 2, '550e8400-e29b-41d4-a716-446655440002', now() + interval '1 day', 'Paket untuk wilayah Jakarta Selatan - shift pagi'),
('Karung Jakarta Utara - Pagi', 3, '550e8400-e29b-41d4-a716-446655440003', now() + interval '1 day', 'Paket untuk wilayah Jakarta Utara - shift pagi'),
('Karung Jakarta Barat - Pagi', 4, null, now() + interval '2 days', 'Paket untuk wilayah Jakarta Barat - belum ditugaskan'),
('Karung Jakarta Timur - Pagi', 5, null, now() + interval '2 days', 'Paket untuk wilayah Jakarta Timur - belum ditugaskan');

-- Insert produk data
INSERT INTO produk (karung_id, nama_paket, nama_pemesan, alamat, status, tanggal_ditambahkan, scanning_time, detail) VALUES
-- Karung Jakarta Pusat - Pagi
(1, 'Paket Elektronik - Laptop', 'John Doe', 'Jl. Sudirman No. 123, Jakarta Pusat', 'pending', now() - interval '2 days', now() - interval '1 day', '{"berat": "2.5kg", "nilai": 15000000, "fragile": true}'),
(1, 'Paket Fashion - Baju', 'Jane Smith', 'Jl. Thamrin No. 456, Jakarta Pusat', 'on_route', now() - interval '1 day', now() - interval '12 hours', '{"berat": "0.5kg", "nilai": 500000, "fragile": false}'),
(1, 'Paket Makanan - Kue', 'Bob Johnson', 'Jl. Gatot Subroto No. 789, Jakarta Pusat', 'delivered', now() - interval '3 days', now() - interval '2 days', '{"berat": "1kg", "nilai": 200000, "fragile": true}'),
(1, 'Paket Buku - Novel', 'Alice Brown', 'Jl. HR Rasuna Said No. 321, Jakarta Pusat', 'pending', now() - interval '1 day', now() - interval '6 hours', '{"berat": "0.3kg", "nilai": 150000, "fragile": false}'),
(1, 'Paket Kosmetik - Skincare', 'Carol Davis', 'Jl. Kuningan No. 654, Jakarta Pusat', 'on_route', now() - interval '1 day', now() - interval '8 hours', '{"berat": "0.8kg", "nilai": 800000, "fragile": true}'),

-- Karung Jakarta Pusat - Siang
(2, 'Paket Elektronik - HP', 'David Wilson', 'Jl. Senayan No. 111, Jakarta Pusat', 'pending', now() - interval '1 day', now() - interval '4 hours', '{"berat": "0.2kg", "nilai": 5000000, "fragile": true}'),
(2, 'Paket Fashion - Sepatu', 'Emma Taylor', 'Jl. Kebayoran Baru No. 222, Jakarta Pusat', 'delivered', now() - interval '2 days', now() - interval '1 day', '{"berat": "1.2kg", "nilai": 1200000, "fragile": false}'),
(2, 'Paket Makanan - Roti', 'Frank Miller', 'Jl. Menteng No. 333, Jakarta Pusat', 'on_route', now() - interval '1 day', now() - interval '10 hours', '{"berat": "0.5kg", "nilai": 100000, "fragile": true}'),

-- Karung Jakarta Selatan - Pagi
(3, 'Paket Elektronik - Tablet', 'Grace Lee', 'Jl. Kemang Raya No. 444, Jakarta Selatan', 'pending', now() - interval '1 day', now() - interval '2 hours', '{"berat": "0.6kg", "nilai": 8000000, "fragile": true}'),
(3, 'Paket Fashion - Tas', 'Henry Chen', 'Jl. Pondok Indah No. 555, Jakarta Selatan', 'delivered', now() - interval '3 days', now() - interval '2 days', '{"berat": "0.4kg", "nilai": 600000, "fragile": false}'),
(3, 'Paket Makanan - Snack', 'Ivy Wang', 'Jl. Cilandak No. 666, Jakarta Selatan', 'on_route', now() - interval '1 day', now() - interval '14 hours', '{"berat": "0.3kg", "nilai": 50000, "fragile": false}'),
(3, 'Paket Buku - Komik', 'Jack Liu', 'Jl. Fatmawati No. 777, Jakarta Selatan', 'pending', now() - interval '1 day', now() - interval '3 hours', '{"berat": "0.2kg", "nilai": 80000, "fragile": false}'),

-- Karung Jakarta Utara - Pagi
(4, 'Paket Elektronik - Headphone', 'Kate Zhang', 'Jl. Kelapa Gading No. 888, Jakarta Utara', 'delivered', now() - interval '2 days', now() - interval '1 day', '{"berat": "0.3kg", "nilai": 2000000, "fragile": true}'),
(4, 'Paket Fashion - Jaket', 'Leo Kim', 'Jl. Sunter No. 999, Jakarta Utara', 'on_route', now() - interval '1 day', now() - interval '16 hours', '{"berat": "0.8kg", "nilai": 900000, "fragile": false}'),
(4, 'Paket Makanan - Kue Kering', 'Mia Park', 'Jl. Pluit No. 101, Jakarta Utara', 'pending', now() - interval '1 day', now() - interval '1 hour', '{"berat": "0.6kg", "nilai": 120000, "fragile": true}'),

-- Karung Jakarta Barat - Pagi (unassigned)
(5, 'Paket Elektronik - Mouse', 'Noah Kim', 'Jl. Kebon Jeruk No. 202, Jakarta Barat', 'pending', now() - interval '1 day', null, '{"berat": "0.1kg", "nilai": 300000, "fragile": false}'),
(5, 'Paket Fashion - Topi', 'Olivia Park', 'Jl. Puri Indah No. 303, Jakarta Barat', 'pending', now() - interval '1 day', null, '{"berat": "0.2kg", "nilai": 150000, "fragile": false}'),

-- Karung Jakarta Timur - Pagi (unassigned)
(6, 'Paket Elektronik - Keyboard', 'Paul Lee', 'Jl. Cakung No. 404, Jakarta Timur', 'pending', now() - interval '1 day', null, '{"berat": "0.8kg", "nilai": 1500000, "fragile": false}'),
(6, 'Paket Fashion - Dompet', 'Quinn Zhang', 'Jl. Jatinegara No. 505, Jakarta Timur', 'pending', now() - interval '1 day', null, '{"berat": "0.3kg", "nilai": 400000, "fragile": false}');

-- Insert history data
INSERT INTO history_pengiriman (produk_id, kurir_id, aksi, bukti_url) VALUES
-- Delivered packages
(3, '550e8400-e29b-41d4-a716-446655440001', 'delivered', 'https://example.com/bukti1.jpg'),
(7, '550e8400-e29b-41d4-a716-446655440001', 'delivered', 'https://example.com/bukti2.jpg'),
(10, '550e8400-e29b-41d4-a716-446655440002', 'delivered', 'https://example.com/bukti3.jpg'),
(13, '550e8400-e29b-41d4-a716-446655440003', 'delivered', 'https://example.com/bukti4.jpg'),

-- On route packages
(2, '550e8400-e29b-41d4-a716-446655440001', 'picked', null),
(5, '550e8400-e29b-41d4-a716-446655440001', 'picked', null),
(8, '550e8400-e29b-41d4-a716-446655440001', 'picked', null),
(11, '550e8400-e29b-41d4-a716-446655440002', 'picked', null),
(14, '550e8400-e29b-41d4-a716-446655440003', 'picked', null);

-- Update karung with package counts
UPDATE karung SET 
  jumlah_paket = (
    SELECT COUNT(*) 
    FROM produk 
    WHERE produk.karung_id = karung.id
  );
