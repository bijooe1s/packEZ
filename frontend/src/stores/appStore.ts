import { create } from 'zustand'
import type { Karung, Produk, Wilayah } from '../types'

interface AppState {
  karung: Karung[]
  produk: Produk[]
  wilayah: Wilayah[]
  selectedKarung: Karung | null
  filters: {
    search: string
    status: string
    dateRange: { start: string; end: string }
  }
  isLoading: boolean
  
  // Actions
  setKarung: (karung: Karung[]) => void
  setProduk: (produk: Produk[]) => void
  setWilayah: (wilayah: Wilayah[]) => void
  setSelectedKarung: (karung: Karung | null) => void
  setFilters: (filters: Partial<AppState['filters']>) => void
  setLoading: (loading: boolean) => void
  
  // Computed values
  getFilteredProduk: () => Produk[]
  getKarungByWilayah: (wilayahId: number) => Karung[]
}

export const useAppStore = create<AppState>((set, get) => ({
  karung: [],
  produk: [],
  wilayah: [],
  selectedKarung: null,
  filters: {
    search: '',
    status: '',
    dateRange: { start: '', end: '' }
  },
  isLoading: false,

  setKarung: (karung) => set({ karung }),
  setProduk: (produk) => set({ produk }),
  setWilayah: (wilayah) => set({ wilayah }),
  setSelectedKarung: (karung) => set({ selectedKarung: karung }),
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  setLoading: (loading) => set({ isLoading: loading }),

  getFilteredProduk: () => {
    const { produk, filters, selectedKarung } = get()
    let filtered = produk

    // Filter by selected karung
    if (selectedKarung) {
      filtered = filtered.filter(p => p.karung_id === selectedKarung.id)
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(p => 
        p.nama_paket.toLowerCase().includes(searchLower) ||
        p.nama_pemesan.toLowerCase().includes(searchLower) ||
        p.alamat.toLowerCase().includes(searchLower)
      )
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status)
    }

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      filtered = filtered.filter(p => {
        const packageDate = new Date(p.tanggal_ditambahkan)
        return packageDate >= startDate && packageDate <= endDate
      })
    }

    // Sort by scanning_time (oldest first) or tanggal_ditambahkan
    return filtered.sort((a, b) => {
      const aTime = a.scanning_time || a.tanggal_ditambahkan
      const bTime = b.scanning_time || b.tanggal_ditambahkan
      return new Date(aTime).getTime() - new Date(bTime).getTime()
    })
  },

  getKarungByWilayah: (wilayahId) => {
    const { karung } = get()
    return karung.filter(k => k.wilayah_id === wilayahId)
  }
}))
