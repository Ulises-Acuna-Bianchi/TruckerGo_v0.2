import { useLocation } from 'react-router'
import contactVideo from '../../assets/contacto.mp4'
import contactPoster from '../../assets/posters/contacto.jpg'
import ContactForm from '../../components/ContactForm/ContactForm'
import ContactIntro from '../../components/ContactIntro/ContactIntro'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import LazyVideo from '../../components/LazyVideo/LazyVideo'
import styles from './ContactoPage.module.css'

function ContactoPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <LazyVideo
          className={styles.backgroundVideo}
          src={contactVideo}
          poster={contactPoster}
          aria-hidden="true"
        />
        <div className={styles.layout}>
          <ContactIntro />
          <ContactForm
            key={location.search}
            initialProfile={params.get('perfil') ?? ''}
            initialReason={params.get('motivo') ?? ''}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ContactoPage
