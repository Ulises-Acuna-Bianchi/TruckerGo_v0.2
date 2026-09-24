import styles from './GoogleRouteMap.module.css'

type GoogleRouteMapProps = {
  apiKey: string
  title: string
} & (
  | { mode: 'directions'; origin: string; destination: string }
  | { mode: 'place'; place: string }
)

function GoogleRouteMap(props: GoogleRouteMapProps) {
  const url = new URL(`https://www.google.com/maps/embed/v1/${props.mode}`)
  url.searchParams.set('key', props.apiKey)
  url.searchParams.set('language', 'es')

  if (props.mode === 'directions') {
    url.searchParams.set('origin', props.origin)
    url.searchParams.set('destination', props.destination)
    url.searchParams.set('mode', 'driving')
  } else {
    url.searchParams.set('q', props.place)
  }

  return (
    <div className={styles.map}>
      <iframe
        key={url.toString()}
        title={props.title}
        src={url.toString()}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}

export default GoogleRouteMap
