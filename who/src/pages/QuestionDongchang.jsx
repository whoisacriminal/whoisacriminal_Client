import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './QuestionDongchang.css'
import bgBlackboard from '../assets/background/bg-blackboard.png'
import handcuffs from '../assets/start/handcuffs.png'
import fileBoard from '../assets/question/file.png'
import tape1 from '../assets/question/tape1.png'
import tape2 from '../assets/question/tape2.png'
import dongchangPolar from '../assets/suspect/dc-polar.png'

const QUESTIONS = [
  {
    id: 'time',
    text: '어떤 선생님을 만났나요?',
    answer: '00선생님을 만나러 교무실에 갔어요.',
  },
  {
    id: 'leave',
    text: '교무실에 몇분 정도 있었나요?',
    answer: '30분 정도 있었던 것 같아요',
  },
  {
    id: 'transportation',
    text: '교무실에 들린 이유는 무엇인가요?',
    answer: '개발 도중 도저히 안 고쳐지는 오류가 생겨서 도움을 요청하러 교무실에 갔어요.',
  },
]

export default function QuestionDongchang() {
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
    <main className="dongchang-question-shell">
      <img className="dongchang-bg" src={bgBlackboard} alt="" draggable="false" />
      <img className="dongchang-handcuffs" src={handcuffs} alt="" draggable="false" />

      <header className="dongchang-question-header">
        <h1>용의자 심문</h1>
        <p>조동창</p>
      </header>

      <section className="dongchang-file" aria-label="조동창 심문지">
        <img className="dongchang-file-img" src={fileBoard} alt="" draggable="false" />

        <div className="dongchang-left-page">
          <article className={`dongchang-polaroid ${selected ? 'has-testimony' : ''}`}>
            <img className="dongchang-tape dongchang-tape-left" src={tape1} alt="" draggable="false" />
            <div className="dongchang-photo-slot">
              <img src={dongchangPolar} alt="조동창 증언 사진" draggable="false" />
            </div>
            <p>{selected ? selected.answer : '용의자 증언'}</p>
          </article>
        </div>

        <div className="dongchang-center-line" />

        <div className="dongchang-right-page">
          <article className="dongchang-question-paper">
            <img className="dongchang-tape dongchang-tape-right" src={tape2} alt="" draggable="false" />

            <p className={`dongchang-notice ${selected ? 'is-hidden' : ''}`}>
              추가 질문은 한 번만 가능합니다.
            </p>

            <div className={`dongchang-question-list ${selected ? 'is-answered' : ''}`}>
              {QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  className={`dongchang-question-btn ${
                    selected?.id === question.id ? 'is-selected' : ''}
                  }`}
                  onClick={() => setSelectedQuestion(question.id)}
                  disabled={Boolean(selected)}
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
