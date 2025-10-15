import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      wilayah: {
        Row: {
          id: number
          nama_wilayah: string
          kode_wilayah: string
        }
        Insert: {
          id?: number
          nama_wilayah: string
          kode_wilayah: string
        }
        Update: {
          id?: number
          nama_wilayah?: string
          kode_wilayah?: string
        }
      }
      users_packez: {
        Row: {
          id: string
          username: string
          full_name: string
          role: 'admin' | 'kurir'
          email: string
          phone: string
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          full_name: string
          role: 'admin' | 'kurir'
          email: string
          phone: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          role?: 'admin' | 'kurir'
          email?: string
          phone?: string
          created_at?: string
        }
      }
      karung: {
        Row: {
          id: number
          nama_karung: string
          wilayah_id: number
          kurir_id: string | null
          jadwal_pengambilan: string | null
          deskripsi: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          nama_karung: string
          wilayah_id: number
          kurir_id?: string | null
          jadwal_pengambilan?: string | null
          deskripsi?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          nama_karung?: string
          wilayah_id?: number
          kurir_id?: string | null
          jadwal_pengambilan?: string | null
          deskripsi?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      produk: {
        Row: {
          id: number
          karung_id: number
          nama_paket: string
          nama_pemesan: string
          alamat: string
          foto_url: string | null
          status: 'pending' | 'on_route' | 'delivered'
          tanggal_ditambahkan: string
          scanning_time: string | null
          detail: any | null
        }
        Insert: {
          id?: number
          karung_id: number
          nama_paket: string
          nama_pemesan: string
          alamat: string
          foto_url?: string | null
          status?: 'pending' | 'on_route' | 'delivered'
          tanggal_ditambahkan?: string
          scanning_time?: string | null
          detail?: any | null
        }
        Update: {
          id?: number
          karung_id?: number
          nama_paket?: string
          nama_pemesan?: string
          alamat?: string
          foto_url?: string | null
          status?: 'pending' | 'on_route' | 'delivered'
          tanggal_ditambahkan?: string
          scanning_time?: string | null
          detail?: any | null
        }
      }
      history_pengiriman: {
        Row: {
          id: number
          produk_id: number
          kurir_id: string
          waktu_action: string
          aksi: string
          bukti_url: string | null
        }
        Insert: {
          id?: number
          produk_id: number
          kurir_id: string
          waktu_action?: string
          aksi: string
          bukti_url?: string | null
        }
        Update: {
          id?: number
          produk_id?: number
          kurir_id?: string
          waktu_action?: string
          aksi?: string
          bukti_url?: string | null
        }
      }
    }
  }
}
