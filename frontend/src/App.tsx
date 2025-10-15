import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import Login from './pages/Login'
import KurirDashboard from './pages/KurirDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  // Route based on user role
  if (user?.role === 'admin') {
    return <AdminDashboard />
  }

  if (user?.role === 'kurir') {
    return <KurirDashboard />
  }

  return <Login />
}

export default App
