import { create } from 'zustand'
import type { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true })
    
    try {
      // For demo purposes, we'll use mock authentication
      // In production, this would use Supabase Auth
      const mockUsers = {
        'kurir': { password: 'kurirpackEZ', user: {
          id: 'kurir-1',
          username: 'kurir',
          full_name: 'Kurir PackEZ',
          role: 'kurir' as const,
          email: 'kurir@packez.com',
          phone: '+6281234567890',
          created_at: new Date().toISOString()
        }},
        'admin': { password: 'adminpackEZ', user: {
          id: 'admin-1',
          username: 'admin',
          full_name: 'Admin PackEZ',
          role: 'admin' as const,
          email: 'admin@packez.com',
          phone: '+6281234567891',
          created_at: new Date().toISOString()
        }}
      }

      const userData = mockUsers[username as keyof typeof mockUsers]
      
      if (userData && userData.password === password) {
        set({ 
          user: userData.user, 
          isAuthenticated: true, 
          isLoading: false 
        })
        localStorage.setItem('packez_user', JSON.stringify(userData.user))
        return { success: true }
      } else {
        set({ isLoading: false })
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      set({ isLoading: false })
      return { success: false, error: 'Login failed' }
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
    localStorage.removeItem('packez_user')
  },

  checkAuth: async () => {
    set({ isLoading: true })
    
    try {
      const storedUser = localStorage.getItem('packez_user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      set({ isLoading: false })
    }
  }
}))
