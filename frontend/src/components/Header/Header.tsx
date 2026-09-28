import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styles from './Header.module.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const onDadores = pathname === '/dadores'
  const onTransportistas = pathname === '/transportistas'
  const onContacto = pathname === '/contacto'

  useEffect(() => {
    let lastScrollY = Math.max(0, window.scrollY)
    let direction = 0
    let distance = 0
    let frameId = window.requestAnimationFrame(() => {
      setHidden(false)
      frameId = 0
    })

    function updateVisibility() {
      frameId = 0
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const scrollY = Math.min(maxScrollY, Math.max(0, window.scrollY))
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      const focusedControl = headerRef.current?.querySelector(':focus-visible')
      if (menuOpen || focusedControl || scrollY <= (headerRef.current?.offsetHeight ?? 72)) {
        setHidden(false)
        direction = 0
        distance = 0
        return
      }

      if (delta === 0) return
      const nextDirection = Math.sign(delta)
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta)
      direction = nextDirection

      if (distance >= 8) {
        setHidden(direction > 0)
        distance = 0
      }
    }

    function handleScroll() {
      if (!frameId) frameId = window.requestAnimationFrame(updateVisibility)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(frameId)
    }
  }, [menuOpen, pathname])

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

  const isHidden = hidden && !menuOpen

  return (
    <div className={styles.headerSpace}>
      <header
        className={`${styles.header} ${isHidden ? styles.hidden : ''}`}
        ref={headerRef}
        inert={isHidden}
        onFocusCapture={() => setHidden(false)}
      >
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
    </div>
  )
}

export default Header
