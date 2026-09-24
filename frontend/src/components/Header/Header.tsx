import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styles from './Header.module.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const onDadores = pathname === '/dadores'
  const onTransportistas = pathname === '/transportistas'
  const onContacto = pathname === '/contacto'

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        <Link
          className={styles.logo}
          to="/"
          aria-label="TruckerGO, ir al inicio"
        >
          TG
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true">☰</span>
        </button>
      </div>

      {menuOpen && (
        <nav id="main-menu" className={styles.menu} aria-label="Menú principal">
          <div className={styles.menuHeading}>
            <strong>Menú principal</strong>
            <span>Elegí una sección</span>
          </div>
          <Link
            className={`${styles.menuLink} ${onHome ? styles.activeLink : ''}`}
            to="/"
            aria-current={onHome ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Inicio / Inversores
            {onHome && <span className={styles.currentBadge}>ACTUAL</span>}
          </Link>
          <Link
            className={`${styles.menuLink} ${onDadores ? styles.activeLink : ''}`}
            to="/dadores"
            aria-current={onDadores ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Dadores de carga
            {onDadores && <span className={styles.currentBadge}>ACTUAL</span>}
          </Link>
          <Link
            className={`${styles.menuLink} ${onTransportistas ? styles.activeLink : ''}`}
            to="/transportistas"
            aria-current={onTransportistas ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Transportistas
            {onTransportistas && <span className={styles.currentBadge}>ACTUAL</span>}
          </Link>
          <Link
            className={`${styles.menuLink} ${onContacto ? styles.activeLink : ''}`}
            to="/contacto"
            aria-current={onContacto ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Contacto
            {onContacto && <span className={styles.currentBadge}>ACTUAL</span>}
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
