import Image from 'next/image'
import { useRouter } from 'next/router'

const Hero = () => {
  const handleCompetitionsClick = () => {
    window.open('https://roxom.com/competitions', '_blank');
  }

  return (
    <section id="hero">
      <div className="hero-content">
        <h1>Compete. Win.<br />Get Rewards.</h1>
        <p>We give you 0.5 paper BTC to trade—no risk, all rewards.</p>
        <p>Compete each week for the opportunity to win up to 1000 USD in BTC.</p>
        <p>Are you ready?</p>
        <button id="ctaButton" onClick={handleCompetitionsClick}>Join Competitions</button>
      </div>
      <div className="hero-image">
        <Image 
          src="/bannerObject1.29e2edc6.png" 
          alt="Banner Object" 
          width={500} 
          height={300}
          priority
        />
      </div>
    </section>
  )
}

export default Hero 