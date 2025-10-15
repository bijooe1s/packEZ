export interface User {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'kurir';
  email: string;
  phone: string;
  created_at: string;
}

export interface Wilayah {
  id: number;
  nama_wilayah: string;
  kode_wilayah: string;
}

export interface Karung {
  id: number;
  nama_karung: string;
  wilayah_id: number;
  kurir_id?: string;
  jadwal_pengambilan?: string;
  deskripsi?: string;
  created_at: string;
  updated_at: string;
  wilayah?: Wilayah;
  kurir?: User;
  jumlah_paket?: number;
}

export interface Produk {
  id: number;
  karung_id: number;
  nama_paket: string;
  nama_pemesan: string;
  alamat: string;
  foto_url?: string;
  status: 'pending' | 'on_route' | 'delivered';
  tanggal_ditambahkan: string;
  scanning_time?: string;
  detail?: Record<string, any>;
  karung?: Karung;
}

export interface HistoryPengiriman {
  id: number;
  produk_id: number;
  kurir_id: string;
  waktu_action: string;
  aksi: string;
  bukti_url?: string;
  produk?: Produk;
  kurir?: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  karung: Karung[];
  produk: Produk[];
  wilayah: Wilayah[];
  selectedKarung: Karung | null;
  filters: {
    search: string;
    status: string;
    dateRange: { start: string; end: string };
  };
}
