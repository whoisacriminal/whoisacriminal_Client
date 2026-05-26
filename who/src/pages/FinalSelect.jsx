import './FinalSelect.css'
import bgDark from '../assets/background/bg-dark.png'
import coffeeCircle from '../assets/background/coffee-circle.png'
import coffeeStain from '../assets/background/coffee-stain.png'
import dongchang from '../assets/suspect/dongchang.png'
import sarang from '../assets/suspect/sarang.png'
import teamwon from '../assets/suspect/teamwon.png'
import yideung from '../assets/suspect/yideung.png'
import { useNavigate } from 'react-router-dom'

const SUSPECTS = [
  { id: 'jo', name: '조동창', image: dongchang },
  { id: 'woo', name: '우팀원', image: teamwon },
  { id: 'yun', name: '윤이등', image: yideung },
  { id: 'lee', name: '이사랑', image: sarang },
]

export default function FinalSelect() {
  const navigate = useNavigate()

  function handleSelect(id) {
    if (id === 'jo') {
      navigate('/missioncompleted')
    } else {
      navigate('/missionfailed')
    }
  }

  return (
    <main className="final-select-shell">
      <img
        className="final-dark-bg"
        src={bgDark}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="final-coffee-stain"
        src={coffeeStain}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="final-coffee-circle"
        src={coffeeCircle}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <header className="final-select-header">
        <h1>
          당신이 생각하는
          <br />
          김이레를 죽인 범인은?
        </h1>
      </header>

      <section className="final-suspect-list" aria-label="최종 범인 선택">
        {SUSPECTS.map((suspect) => (
          <button
            key={suspect.id}
            type="button"
            className="final-suspect"
            onClick={() => handleSelect(suspect.id)}
          >
            <span className="final-photo-frame">
              <img
                className="final-photo"
                src={suspect.image}
                alt={`${suspect.name} 증명사진`}
                draggable="false"
              />
            </span>
            <span className="final-suspect-name">{suspect.name}</span>
          </button>
        ))}
      </section>
    </main>
  )
}
