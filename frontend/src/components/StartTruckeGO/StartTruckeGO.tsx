import {
  ArrowRight,
  Package,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { preventPendingNavigation } from '../../pendingLinks'
import styles from './StartTruckeGO.module.css'

type AccessCardProps = {
  audience: string
  title: string
  description: string
  action: string
  href: string
  icon: LucideIcon
}

const accessOptions: AccessCardProps[] = [
  {
    audience: 'Dadores de carga',
    title: 'Necesito transportar una carga',
    description:
      'Indicá qué vas a mover, el origen y el destino para preparar tu publicación.',
    action: 'Publicar una carga',
    href: '/dadores',
    icon: Package,
  },
  {
    audience: 'Transportistas',
    title: 'Busco una carga para mi camión',
    description:
      'Explorá cargas y compará recorridos, pagos y requisitos para tu próximo viaje.',
    action: 'Buscar cargas',
    href: '/transportistas',
    icon: Truck,
  },
]

function AccessCard({
  audience,
  title,
  description,
  action,
  href,
  icon: Icon,
}: AccessCardProps) {
  const actionContent = (
    <>
      <span>{action}</span>
      <ArrowRight aria-hidden="true" strokeWidth={2} />
    </>
  )

  return (
    <article className={styles.card}>
      <div className={styles.audience}>
        <span className={styles.audienceIcon}>
          <Icon aria-hidden="true" strokeWidth={2} />
        </span>
        <p>{audience}</p>
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>

      {href.startsWith('#pendiente-') ? (
        <a className={styles.action} href={href} onClick={preventPendingNavigation}>
          {actionContent}
        </a>
      ) : (
        <Link className={styles.action} to={href}>
          {actionContent}
        </Link>
      )}
    </article>
  )
}

function StartTruckeGO() {
  return (
    <section
      id="starttruckego"
      className={styles.section}
      aria-labelledby="starttruckego-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span aria-hidden="true" />
            <p>Empezá con TruckerGO</p>
          </div>

          <h2 id="starttruckego-title" className={styles.title}>
            ¿Qué necesitás hacer?
          </h2>
          <p className={styles.description}>
            Elegí cómo querés usar la plataforma.
          </p>
        </header>

        <div className={styles.cards}>
          {accessOptions.map((option) => (
            <AccessCard key={option.audience} {...option} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StartTruckeGO
