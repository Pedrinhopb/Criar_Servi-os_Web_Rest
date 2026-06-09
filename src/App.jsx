import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage     from './pages/LandingPage'
import LoginPage       from './pages/LoginPage'
import Cadastro        from './pages/Cadastro'
import Estoque         from './pages/Estoque'
import Administrativo  from './pages/Administrativo'
import WorkInProgress  from './pages/WorkInProgress'

export default function App() {
  const [user,          setUser]          = useState(null)
  const [sidebarAberta, setSidebarAberta] = useState(false)

  useEffect(() => {
    const raw   = localStorage.getItem('stockeasy_user')
    const token = localStorage.getItem('stockeasy_token')
    if (raw && token) {
      try { setUser(JSON.parse(raw)) } catch { setUser(null) }
    }
  }, [])

  function handleLogin(userObj) {
    localStorage.setItem('stockeasy_user', JSON.stringify(userObj))
    setUser(userObj)
  }

  function handleLogout() {
    localStorage.removeItem('stockeasy_user')
    localStorage.removeItem('stockeasy_token') // ← remove o token também
    setUser(null)
  }

  const sharedProps = {
    user,
    onLogout:        handleLogout,
    sidebarAberta,
    onToggleSidebar: () => setSidebarAberta(v => !v),
    onFecharSidebar: () => setSidebarAberta(false),
  }

  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={user ? <Navigate to="/cadastro" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<Navigate to="/login" replace />} />

      <Route path="/cadastro/*"     element={user ? <Cadastro       {...sharedProps} /> : <Navigate to="/login" replace />} />
      <Route path="/estoque"        element={user ? <Estoque        {...sharedProps} /> : <Navigate to="/login" replace />} />
      <Route path="/administrativo" element={user ? <Administrativo {...sharedProps} /> : <Navigate to="/login" replace />} />
      <Route path="/dashboard"      element={user ? <WorkInProgress {...sharedProps} title="Dashboard"  /> : <Navigate to="/login" replace />} />
      <Route path="/relatorios"     element={user ? <WorkInProgress {...sharedProps} title="Relatórios" /> : <Navigate to="/login" replace />} />
      <Route path="/financeiro"     element={user ? <WorkInProgress {...sharedProps} title="Financeiro" /> : <Navigate to="/login" replace />} />
      <Route path="/ajuda"          element={user ? <WorkInProgress {...sharedProps} title="Ajuda"      /> : <Navigate to="/login" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}