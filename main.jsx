import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Storage API for persistence (same as claude.ai artifacts)
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      try {
        const val = localStorage.getItem('wbos_' + key)
        return val ? { key, value: val } : null
      } catch { return null }
    },
    set: async (key, value) => {
      try {
        localStorage.setItem('wbos_' + key, value)
        return { key, value }
      } catch { return null }
    },
    delete: async (key) => {
      try {
        localStorage.removeItem('wbos_' + key)
        return { key, deleted: true }
      } catch { return null }
    },
    list: async (prefix) => {
      try {
        const keys = Object.keys(localStorage)
          .filter(k => k.startsWith('wbos_' + (prefix || '')))
          .map(k => k.replace('wbos_', ''))
        return { keys }
      } catch { return { keys: [] } }
    }
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
