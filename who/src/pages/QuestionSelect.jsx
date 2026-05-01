import { useState } from 'react'
import './QuestionSelect.css'
import coffeeCircle from '../assets/background/coffee-circle.png'
import coffeeStain from '../assets/background/coffee-stain.png'
import dongchang from '../assets/suspect/dongchang.png'
import sarang from '../assets/suspect/sarang.png'
import teamwon from '../assets/suspect/teamwon.png'
import yideung from '../assets/suspect/yideung.png'

const SUSPECTS = [
  { id: 'jo', name: '조동창', image: dongchang },
  { id: 'woo', name: '우팀원', image: teamwon },
  { id: 'yun', name: '윤이등', image: yideung },
  { id: 'lee', name: '이사랑', image: sarang },
]

export default function QuestionSelect() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <main className="question-select-shell">
      <img
        className="question-coffee-stain"
        src={coffeeStain}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="question-coffee-circle"
        src={coffeeCircle}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <header className="question-select-header">
        <h1>누구를 심문할까요?</h1>
        <p>한사람만 심문할 수 있어요</p>
      </header>

      <section className="question-suspect-list" aria-label="심문할 사람 선택">
        {SUSPECTS.map((suspect) => {
          const isSelected = selectedId === suspect.id

          return (
            <button
              key={suspect.id}
              type="button"
              className={`question-suspect ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setSelectedId(suspect.id)}
              aria-pressed={isSelected}
            >
              <span className="question-photo-frame">
                <img
                  src={suspect.image}
                  alt={`${suspect.name} 증명사진`}
                  className="question-photo"
                  draggable="false"
                />
              </span>
              <span className="question-suspect-name">{suspect.name}</span>
            </button>
          )
        })}
      </section>
    </main>
  )
}
