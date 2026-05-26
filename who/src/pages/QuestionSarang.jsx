import { useState } from 'react'
import './QuestionSarang.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgBlackboard from '../assets/background/bg-blackboard.png'
import handcuffs from '../assets/start/handcuffs.png'
import fileBoard from '../assets/question/file.png'
import tape1 from '../assets/question/tape1.png'
import tape2 from '../assets/question/tape2.png'
import sarangPolar from '../assets/suspect/sr-polar.png'

const QUESTIONS = [
  {
    id: 'time',
    text: '집까지 가는데 걸린 시간은 얼마나 되나요?',
    answer: '집까지 가는데 20분 정도 걸려요.',
  },
  {
    id: 'leave',
    text: '몇시에 학교 밖을 나왔나요?',
    answer: '9시 20분 쯤 나온 것 같아요.',
  },
  {
    id: 'transportation',
    text: '집을 갈 때 무슨 교통수단을 이용했나요?',
    answer: '저는 보통 버스를 타고 집에 가는 편이에요.',
  },
]

export default function QuestionSarang() {
  const navigate = useNavigate()
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const selected = QUESTIONS.find((question) => question.id === selectedQuestion)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/finalselect')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  return (
    <main className="sarang-question-shell">
      <img className="sarang-bg" src={bgBlackboard} alt="" draggable="false" />
      <img className="sarang-handcuffs" src={handcuffs} alt="" draggable="false" />

      <header className="sarang-question-header">
        <h1>용의자 심문</h1>
        <p>이사랑</p>
      </header>

      <section className="sarang-file" aria-label="이사랑 심문지">
        <img className="sarang-file-img" src={fileBoard} alt="" draggable="false" />

        <div className="sarang-left-page">
          <article className={`sarang-polaroid ${selected ? 'has-testimony' : ''}`}>
            <img className="sarang-tape sarang-tape-left" src={tape1} alt="" draggable="false" />
            <div className="sarang-photo-slot">
              <img src={sarangPolar} alt="이사랑 증언 사진" draggable="false" />
            </div>
            <p>{selected ? selected.answer : '용의자 증언'}</p>
          </article>
        </div>

        <div className="sarang-center-line" />

        <div className="sarang-right-page">
          <article className="sarang-question-paper">
            <img className="sarang-tape sarang-tape-right" src={tape2} alt="" draggable="false" />

            <p className="sarang-notice">
              궁금한 질문을 모두 확인하세요.
            </p>

            <div className={`sarang-question-list ${selected ? 'is-answered' : ''}`}>
              {QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  className={`sarang-question-btn ${
                    selected?.id === question.id ? 'is-selected' : ''}
                  }`}
                  onClick={() => setSelectedQuestion(question.id)}
                >
                  {question.text}
                </button>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

