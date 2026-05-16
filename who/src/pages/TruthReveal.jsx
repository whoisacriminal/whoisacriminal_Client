import './TruthReveal.css'
import bgBlack from '../assets/background/bg-black.png'
import coffeeCircle from '../assets/background/coffee-circle.png'
import coffeeStain from '../assets/background/coffee-stain.png'

export default function TruthReveal() {
  return (
    <main className="truth-reveal-shell">
      <img
        className="truth-reveal-black-bg"
        src={bgBlack}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="truth-reveal-coffee-stain"
        src={coffeeStain}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="truth-reveal-coffee-circle"
        src={coffeeCircle}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <h1 className="truth-reveal-title">
        미림마이스터고
        <br />
        실습실 살인사건의 진범은......
      </h1>
    </main>
  )
}
