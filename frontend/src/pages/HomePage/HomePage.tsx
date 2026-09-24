import FindCargo from '../../components/FindCargo/FindCargo'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import BussinesModel from '../../components/BussinesModel/BussinesModel'
import OurVision from '../../components/OurVision/OurVision'
import FrecuentQuestions from '../../components/FrecuentQuestions/FrecuentQuestions'
import ProblemSection from '../../components/ProblemSection/ProblemSection'
import StartTruckeGO from '../../components/StartTruckeGO/StartTruckeGO'
import TruckerGOInNumbers from '../../components/TruckerGOInNumbers/TruckerGOInNumbers'
import LetsTalk from '../../components/letstalk/LetsTalk'
import Footer from '../../components/Footer/Footer'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <StartTruckeGO />
        <TruckerGOInNumbers />
        <FindCargo />
        <HowItWorks />
        <BussinesModel />
        <OurVision />
        <FrecuentQuestions />
        <LetsTalk />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
