import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'

// Mock useApi (auto-imported by Nuxt)
const mockApiFetch = vi.fn()
vi.stubGlobal('useApi', () => ({ apiFetch: mockApiFetch }))

// Mock navigateTo (auto-imported by Nuxt)
const mockNavigateTo = vi.fn()
vi.stubGlobal('navigateTo', mockNavigateTo)

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockApiFetch.mockReset()
    mockNavigateTo.mockReset()
    localStorage.clear()
  })

  it('login() stores the token on valid credentials', async () => {
    mockApiFetch.mockResolvedValue({ access_token: 'fake-jwt-token' })

    const store = useAuthStore()
    await store.login('admin@test.com', 'password123')

    expect(mockApiFetch).toHaveBeenCalledWith('/auth/login', {
      method: 'POST',
      body: { email: 'admin@test.com', password: 'password123' },
    })
    expect(store.token).toBe('fake-jwt-token')
    expect(localStorage.getItem('admin_token')).toBe('fake-jwt-token')
  })

  it('logout() clears the token and navigates to login', () => {
    const store = useAuthStore()
    store.token = 'some-token'
    localStorage.setItem('admin_token', 'some-token')

    store.logout()

    expect(store.token).toBeNull()
    expect(localStorage.getItem('admin_token')).toBeNull()
    expect(mockNavigateTo).toHaveBeenCalledWith('/admin/login')
  })

  it('isAuthenticated is true when token exists', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)

    store.token = 'a-token'
    expect(store.isAuthenticated).toBe(true)
  })

  it('init() restores token from localStorage', () => {
    localStorage.setItem('admin_token', 'stored-token')

    const store = useAuthStore()
    store.init()

    expect(store.token).toBe('stored-token')
  })
})
