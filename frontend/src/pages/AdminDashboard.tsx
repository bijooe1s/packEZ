import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useAppStore } from '../stores/appStore'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Package, Users, Truck, BarChart3, Plus, Edit, Trash2, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function AdminDashboard() {
  const { user, logout } = useAuthStore()
  const { karung, produk, wilayah, setKarung, setProduk, setWilayah } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demonstration
  useEffect(() => {
    const mockData = {
      wilayah: [
        { id: 1, nama_wilayah: 'Jakarta Pusat', kode_wilayah: 'JKT-01' },
        { id: 2, nama_wilayah: 'Jakarta Selatan', kode_wilayah: 'JKT-02' },
        { id: 3, nama_wilayah: 'Jakarta Utara', kode_wilayah: 'JKT-03' },
        { id: 4, nama_wilayah: 'Jakarta Barat', kode_wilayah: 'JKT-04' },
        { id: 5, nama_wilayah: 'Jakarta Timur', kode_wilayah: 'JKT-05' },
      ],
      karung: [
        {
          id: 1,
          nama_karung: 'Karung Jakarta Pusat - Pagi',
          wilayah_id: 1,
          kurir_id: 'kurir-1',
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
          kurir_id: 'kurir-1',
          jadwal_pengambilan: new Date().toISOString(),
          deskripsi: 'Paket untuk wilayah Jakarta Selatan',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          wilayah: { id: 2, nama_wilayah: 'Jakarta Selatan', kode_wilayah: 'JKT-02' },
          jumlah_paket: 12
        },
        {
          id: 3,
          nama_karung: 'Karung Jakarta Utara - Pagi',
          wilayah_id: 3,
          kurir_id: undefined,
          jadwal_pengambilan: new Date().toISOString(),
          deskripsi: 'Paket untuk wilayah Jakarta Utara',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          wilayah: { id: 3, nama_wilayah: 'Jakarta Utara', kode_wilayah: 'JKT-03' },
          jumlah_paket: 8
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
        },
        {
          id: 4,
          karung_id: 2,
          nama_paket: 'Paket Buku',
          nama_pemesan: 'Alice Brown',
          alamat: 'Jl. Kemang Raya No. 321, Jakarta Selatan',
          status: 'delivered' as const,
          tanggal_ditambahkan: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          scanning_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 5,
          karung_id: 2,
          nama_paket: 'Paket Kosmetik',
          nama_pemesan: 'Carol Davis',
          alamat: 'Jl. Pondok Indah No. 654, Jakarta Selatan',
          status: 'pending' as const,
          tanggal_ditambahkan: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          scanning_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        }
      ]
    }
    
    setWilayah(mockData.wilayah)
    setKarung(mockData.karung)
    setProduk(mockData.produk)
  }, [])

  // Calculate statistics
  const totalPackages = produk.length
  const pendingPackages = produk.filter(p => p.status === 'pending').length
  const onRoutePackages = produk.filter(p => p.status === 'on_route').length
  const deliveredPackages = produk.filter(p => p.status === 'delivered').length
  const totalBags = karung.length

  // Chart data
  const deliveryData = {
    labels: wilayah.map(w => w.nama_wilayah),
    datasets: [
      {
        label: 'Delivered Packages',
        data: wilayah.map(w => {
          const wilayahProduk = produk.filter(p => 
            karung.find(k => k.id === p.karung_id)?.wilayah_id === w.id
          )
          return wilayahProduk.filter(p => p.status === 'delivered').length
        }),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pending Packages',
        data: wilayah.map(w => {
          const wilayahProduk = produk.filter(p => 
            karung.find(k => k.id === p.karung_id)?.wilayah_id === w.id
          )
          return wilayahProduk.filter(p => p.status === 'pending').length
        }),
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderColor: 'rgba(251, 191, 36, 1)',
        borderWidth: 1,
      }
    ]
  }

  const statusData = {
    labels: ['Delivered', 'On Route', 'Pending'],
    datasets: [
      {
        data: [deliveredPackages, onRoutePackages, pendingPackages],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Package Delivery by Region',
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Package Status Distribution',
      },
    },
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'karung', label: 'Manage Bags', icon: Package },
    { id: 'produk', label: 'Manage Packages', icon: Truck },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900 font-urbanist">packEZ Admin</h1>
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
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Package className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Packages</p>
                        <p className="text-2xl font-bold text-gray-900">{totalPackages}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Truck className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Delivered</p>
                        <p className="text-2xl font-bold text-gray-900">{deliveredPackages}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Users className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingPackages}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Bags</p>
                        <p className="text-2xl font-bold text-gray-900">{totalBags}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery by Region</CardTitle>
                    <CardDescription>
                      Package delivery statistics across different regions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar data={deliveryData} options={chartOptions} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Package Status</CardTitle>
                    <CardDescription>
                      Distribution of package statuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Doughnut data={statusData} options={doughnutOptions} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {/* Karung Management Tab */}
        {activeTab === 'karung' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Manage Bags (Karung)</h3>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Bag
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {karung.map((karung) => (
                <motion.div
                  key={karung.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{karung.nama_karung}</CardTitle>
                      <CardDescription>
                        {karung.wilayah?.nama_wilayah} • {karung.jumlah_paket} packages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Schedule:</strong> {new Date(karung.jadwal_pengambilan || '').toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {karung.kurir_id ? 'Assigned' : 'Unassigned'}</p>
                        <p><strong>Created:</strong> {new Date(karung.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Produk Management Tab */}
        {activeTab === 'produk' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Manage Packages</h3>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Package
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bag
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {produk.map((produk) => (
                      <tr key={produk.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{produk.nama_paket}</div>
                            <div className="text-sm text-gray-500">{produk.alamat}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {produk.nama_pemesan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            produk.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            produk.status === 'on_route' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {produk.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {karung.find(k => k.id === produk.karung_id)?.nama_karung}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Schedule</h3>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {karung.map((karung) => (
                <motion.div
                  key={karung.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{karung.nama_karung}</CardTitle>
                      <CardDescription>
                        {karung.wilayah?.nama_wilayah}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Schedule:</strong> {new Date(karung.jadwal_pengambilan || '').toLocaleString()}</p>
                        <p><strong>Packages:</strong> {karung.jumlah_paket}</p>
                        <p><strong>Status:</strong> {karung.kurir_id ? 'Assigned' : 'Unassigned'}</p>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
