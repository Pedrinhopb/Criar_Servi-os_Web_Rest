import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Cadastro from './pages/Cadastro'
import WorkInProgress from './pages/WorkInProgress'

export default function App() {
  const [user, setUser] = useState(null)
  const [sidebarAberta, setSidebarAberta] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('stockeasy_user')
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch (e) {
        setUser(null)
      }
    }
  }, [])

  function handleLogin(userObj) {
    localStorage.setItem('stockeasy_user', JSON.stringify(userObj))
    setUser(userObj)
  }

  function handleLogout() {
    localStorage.removeItem('stockeasy_user')
    setUser(null)
  }

  function onToggleSidebar() {
    setSidebarAberta(v => !v)
  }

  function onFecharSidebar() {
    setSidebarAberta(false)
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/cadastro" replace /> : <LoginPage onLogin={handleLogin} />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/cadastro" replace /> : <RegisterPage onRegister={handleLogin} />}
      />

      <Route
        path="/dashboard"
        element={user ? <WorkInProgress title="Dashboard" /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/relatorios"
        element={user ? <WorkInProgress title="Relatórios" /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/administrativo"
        element={user ? <WorkInProgress title="Administrativo" /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/estoque"
        element={user ? <WorkInProgress title="Estoque" /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/financeiro"
        element={user ? <WorkInProgress title="Financeiro" /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/ajuda"
        element={user ? <WorkInProgress title="Ajuda" /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/cadastro/*"
        element={user ? (
          <Cadastro
            user={user}
            onLogout={handleLogout}
            sidebarAberta={sidebarAberta}
            onToggleSidebar={onToggleSidebar}
            onFecharSidebar={onFecharSidebar}
          />
        ) : (
          <Navigate to="/login" replace />
        )}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
