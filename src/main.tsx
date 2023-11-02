import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { querryClient } from './lib/querryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={querryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
