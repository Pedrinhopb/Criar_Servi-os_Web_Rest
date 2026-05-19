import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import styles from './Header.module.css'

function getInitials(name = '') {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

const NOTIFS = [
  { id:1, icon:'⚠️', text:'Whey Protein 1kg com estoque crítico',      time:'Agora',  unread:true  },
  { id:2, icon:'⚠️', text:'Tênis Runner Pro abaixo do mínimo',          time:'5 min',  unread:true  },
  { id:3, icon:'⚠️', text:'Mochila Urban 30L abaixo do mínimo',         time:'12 min', unread:true  },
  { id:4, icon:'✅', text:'Mariana Costa cadastrada com sucesso',        time:'1h',     unread:false },
  { id:5, icon:'📦', text:'Fone Bluetooth XR adicionado ao estoque',   time:'2h',     unread:false },
]

export default function Header({ user, onLogout, onToggleSidebar }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const [notifOpen,    setNotifOpen]    = useState(false)
  const [profileOpen,  setProfileOpen]  = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notifs,       setNotifs]       = useState(NOTIFS)

  const notifRef    = useRef(null)
  const profileRef  = useRef(null)
  const settingsRef = useRef(null)

  const unread = notifs.filter(n => n.unread).length

  useEffect(() => {
    function onClickOutside(e) {
      if (notifRef.current    && !notifRef.current.contains(e.target))    setNotifOpen(false)
      if (profileRef.current  && !profileRef.current.contains(e.target))  setProfileOpen(false)
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function close() { setNotifOpen(false); setProfileOpen(false); setSettingsOpen(false) }

  return (
    <header className={styles.header}>

      {/* ── ESQUERDA ── */}
      <div className={styles.left}>
        <button className={styles.hamburger} onClick={onToggleSidebar} aria-label="Menu">
          <span/><span/><span/>
        </button>
        <div className={styles.logo} onClick={() => navigate('/cadastro')}>
          <span className={styles.stock}>Stock</span><span className={styles.easy}>Easy</span>
        </div>
        <div className={styles.divider}/>
        <span className={styles.pageTag}>Painel</span>
      </div>

      {/* ── DIREITA ── */}
      <div className={styles.right}>

        {/* Notificações */}
        <div className={styles.wrap} ref={notifRef}>
          <button
            className={`${styles.iconBtn} ${notifOpen ? styles.active : ''}`}
            onClick={() => { close(); setNotifOpen(v => !v) }}
            title="Notificações"
          >
            🔔
            {unread > 0 && <span className={styles.badge}>{unread}</span>}
          </button>

          {notifOpen && (
            <div className={`${styles.drop} ${styles.dropWide}`}>
              <div className={styles.dropHead}>
                <span className={styles.dropTitle}>Notificações</span>
                {unread > 0 && (
                  <button className={styles.dropLink} onClick={() => setNotifs(p => p.map(n => ({...n,unread:false})))}>
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              <div className={styles.notifScroll}>
                {notifs.map(n => (
                  <div key={n.id} className={`${styles.notifRow} ${n.unread ? styles.notifNew : ''}`}>
                    <span className={styles.notifEmoji}>{n.icon}</span>
                    <div className={styles.notifContent}>
                      <span className={styles.notifText}>{n.text}</span>
                      <span className={styles.notifTime}>{n.time}</span>
                    </div>
                    {n.unread && <span className={styles.notifDot}/>}
                  </div>
                ))}
              </div>
              <div className={styles.dropFoot}>
                <button className={styles.dropLink}>Ver todas as notificações</button>
              </div>
            </div>
          )}
        </div>

        {/* Engrenagem / Configurações */}
        <div className={styles.wrap} ref={settingsRef}>
          <button
            className={`${styles.iconBtn} ${settingsOpen ? styles.active : ''}`}
            onClick={() => { close(); setSettingsOpen(v => !v) }}
            title="Configurações"
          >
            <span className={settingsOpen ? styles.spinning : ''}>⚙️</span>
          </button>

          {settingsOpen && (
            <div className={styles.drop}>
              <div className={styles.dropHead}>
                <span className={styles.dropTitle}>Configurações</span>
              </div>

              {/* toggle de tema destacado */}
              <div className={styles.themeRow}>
                <div className={styles.themeInfo}>
                  <span className={styles.themeEmoji}>{isDark ? '☀️' : '🌙'}</span>
                  <div>
                    <div className={styles.themeLabel}>Tema {isDark ? 'Claro' : 'Escuro'}</div>
                    <div className={styles.themeDesc}>Alternar aparência</div>
                  </div>
                </div>
                <button
                  className={`${styles.toggleTrack} ${isDark ? styles.toggleOn : ''}`}
                  onClick={toggleTheme}
                >
                  <span className={styles.toggleThumb}/>
                </button>
              </div>

              <div className={styles.sep}/>

              {[
                { icon:'🔔', label:'Notificações',  desc:'Gerenciar alertas'    },
                { icon:'🔒', label:'Segurança',      desc:'Alterar senha'        },
                { icon:'📊', label:'Exportar dados', desc:'Baixar relatório'     },
              ].map(item => (
                <button key={item.label} className={styles.settItem}>
                  <span className={styles.settIcon}>{item.icon}</span>
                  <div>
                    <div className={styles.settLabel}>{item.label}</div>
                    <div className={styles.settDesc}>{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Perfil */}
        <div className={styles.wrap} ref={profileRef}>
          <button
            className={`${styles.profileBtn} ${profileOpen ? styles.active : ''}`}
            onClick={() => { close(); setProfileOpen(v => !v) }}
          >
            <div className={styles.avatar}>{getInitials(user?.name)}</div>
            <div className={styles.userMeta}>
              <span className={styles.userName}>{user?.name || 'Usuário'}</span>
              <span className={styles.userRole}>{user?.role || 'Administrador'}</span>
            </div>
            <span className={`${styles.chevron} ${profileOpen ? styles.chevronUp : ''}`}>▾</span>
          </button>

          {profileOpen && (
            <div className={styles.drop}>
              {/* cabeçalho do perfil */}
              <div className={styles.profileCard}>
                <div className={styles.avatarLg}>{getInitials(user?.name)}</div>
                <div className={styles.profileInfo}>
                  <div className={styles.profileName}>{user?.name || 'Usuário'}</div>
                  <div className={styles.profileEmail}>{user?.email || 'admin@stockeasy.com'}</div>
                  <span className={styles.profileBadge}>{user?.role || 'Administrador'}</span>
                </div>
              </div>

              <div className={styles.sep}/>

              {[
                { icon:'👤', label:'Meu perfil'    },
                { icon:'✏️', label:'Editar dados'  },
                { icon:'🔑', label:'Alterar senha' },
              ].map(item => (
                <button key={item.label} className={styles.dropItem}>
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}

              <div className={styles.sep}/>

              <button className={`${styles.dropItem} ${styles.dropDanger}`} onClick={() => { close(); onLogout && onLogout(); navigate('/') }}>
                <span>🚪</span> Sair da conta
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}