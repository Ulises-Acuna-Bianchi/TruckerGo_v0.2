import { preventPendingNavigation } from '../../pendingLinks'
import styles from './Footer.module.css'

const socialNetworks = [
  { label: 'Instagram', href: '#pendiente-instagram-corporativo' },
  { label: 'Facebook', href: '#pendiente-facebook-corporativo' },
  { label: 'LinkedIn', href: '#pendiente-linkedin-corporativo' },
]
const ulisesLinkedIn =
  'https://www.linkedin.com/in/ulises-acu%C3%B1a-bianchi-6a36961b4/'

type SocialNetworkProps = {
  label: string
  href: string
}

function SocialNetwork({ label, href }: SocialNetworkProps) {
  return (
    <li className={styles.socialNetwork}>
      <a href={href} onClick={preventPendingNavigation}>{label}</a>
    </li>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.identity}>
            <p className={styles.brand}>TruckerGO</p>
            <p className={styles.copyright}>© 2026 TruckerGO</p>
          </div>

          <div className={styles.social}>
            <p className={styles.socialTitle}>Encontranos en nuestras redes</p>
            <ul className={styles.socialNetworks}>
              {socialNetworks.map((network) => (
                <SocialNetwork key={network.label} {...network} />
              ))}
            </ul>
          </div>

          <div className={styles.credit}>
            <p>
              Sitio creado por <span>Ulises Acuña</span>
            </p>
            <a href={ulisesLinkedIn} target="_blank" rel="noopener noreferrer">
              LinkedIn de Ulises <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
