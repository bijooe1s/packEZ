import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useAppStore } from '../stores/appStore'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Package, Truck, Search, Filter, CheckCircle, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function KurirDashboard() {
  const { user, logout } = useAuthStore()
  const { 
    karung, 
    selectedKarung, 
    setSelectedKarung, 
    filters, 
    setFilters, 
    getFilteredProduk
  } = useAppStore()
  
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockData = {
      wilayah: [
        { id: 1, nama_wilayah: 'Jakarta Pusat', kode_wilayah: 'JKT-01' },
        { id: 2, nama_wilayah: 'Jakarta Selatan', kode_wilayah: 'JKT-02' },
        { id: 3, nama_wilayah: 'Jakarta Utara', kode_wilayah: 'JKT-03' },
      ],
      karung: [
        {
          id: 1,
          nama_karung: 'Karung Jakarta Pusat - Pagi',
          wilayah_id: 1,
          kurir_id: user?.id,
          jadwal_pengambilan: new Date().toISOString(),
          deskripsi: 'Paket untuk wilayah Jakarta Pusat',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          wilayah: { id: 1, nama_wilayah: 'Jakarta Pusat', kode_wilayah: 'JKT-01' },
          jumlah_paket: 15
        },
        {
          id: 2,
          nama_karung: 'Karung Jakarta Selatan - Siang',
          wilayah_id: 2,
          kurir_id: user?.id,
          jadwal_pengambilan: new Date().toISOString(),
          deskripsi: 'Paket untuk wilayah Jakarta Selatan',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          wilayah: { id: 2, nama_wilayah: 'Jakarta Selatan', kode_wilayah: 'JKT-02' },
          jumlah_paket: 12
        }
      ],
      produk: [
        {
          id: 1,
          karung_id: 1,
          nama_paket: 'Paket Elektronik',
          nama_pemesan: 'John Doe',
          alamat: 'Jl. Sudirman No. 123, Jakarta Pusat',
          status: 'pending' as const,
          tanggal_ditambahkan: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          scanning_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          karung_id: 1,
          nama_paket: 'Paket Fashion',
          nama_pemesan: 'Jane Smith',
          alamat: 'Jl. Thamrin No. 456, Jakarta Pusat',
          status: 'on_route' as const,
          tanggal_ditambahkan: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          scanning_time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          karung_id: 1,
          nama_paket: 'Paket Makanan',
          nama_pemesan: 'Bob Johnson',
          alamat: 'Jl. Gatot Subroto No. 789, Jakarta Pusat',
          status: 'delivered' as const,
          tanggal_ditambahkan: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          scanning_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ]
    }
    
    useAppStore.getState().setWilayah(mockData.wilayah)
    useAppStore.getState().setKarung(mockData.karung)
    useAppStore.getState().setProduk(mockData.produk)
  }, [user?.id])

  const handleKarungSelect = (karung: any) => {
    setSelectedKarung(karung)
  }

  const handleMarkDelivered = (produkId: number) => {
    // In a real app, this would update the database
    console.log('Marking product as delivered:', produkId)
  }

  const filteredProduk = getFilteredProduk()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'on_route': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'on_route': return <Truck className="h-4 w-4" />
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900 font-urbanist">packEZ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.full_name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-urbanist">Kurir Dashboard</h2>
          <p className="text-gray-600">Manage your assigned packages and deliveries</p>
        </div>

        {!selectedKarung ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Bag (Karung)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {karung.map((karung) => (
                <motion.div
                  key={karung.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{karung.nama_karung}</CardTitle>
                      <CardDescription>
                        {karung.wilayah?.nama_wilayah} • {karung.jumlah_paket} packages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <p>Schedule: {new Date(karung.jadwal_pengambilan || '').toLocaleDateString()}</p>
                        </div>
                        <Button onClick={() => handleKarungSelect(karung)}>
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedKarung.nama_karung}
                </h3>
                <p className="text-gray-600">
                  {selectedKarung.wilayah?.nama_wilayah} • {filteredProduk.length} packages
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedKarung(null)}>
                Back to Bags
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search packages..."
                      value={filters.search}
                      onChange={(e) => setFilters({ search: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters({ status: e.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="on_route">On Route</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={filters.dateRange.start}
                        onChange={(e) => setFilters({ 
                          dateRange: { ...filters.dateRange, start: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <Input
                        type="date"
                        value={filters.dateRange.end}
                        onChange={(e) => setFilters({ 
                          dateRange: { ...filters.dateRange, end: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Packages List */}
            <div className="space-y-4">
              {filteredProduk.map((produk) => (
                <motion.div
                  key={produk.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {produk.nama_paket}
                            </h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(produk.status)}`}>
                              {getStatusIcon(produk.status)}
                              <span className="ml-1 capitalize">{produk.status.replace('_', ' ')}</span>
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Customer:</strong> {produk.nama_pemesan}</p>
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0" />
                              <span>{produk.alamat}</span>
                            </div>
                            <p><strong>Added:</strong> {new Date(produk.tanggal_ditambahkan).toLocaleString()}</p>
                            {produk.scanning_time && (
                              <p><strong>Last Scanned:</strong> {new Date(produk.scanning_time).toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {produk.status !== 'delivered' && (
                            <Button
                              onClick={() => handleMarkDelivered(produk.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProduk.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
