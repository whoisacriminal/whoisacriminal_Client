import { useState } from 'react'
import './QuestionYideung.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EnterHint from '../components/EnterHint'
import bgBlackboard from '../assets/background/bg-blackboard.png'
import handcuffs from '../assets/start/handcuffs.png'
import fileBoard from '../assets/question/file.png'
import tape1 from '../assets/question/tape1.png'
import tape2 from '../assets/question/tape2.png'
import yideungPolar from '../assets/suspect/yd-polar.png'

const QUESTIONS = [
  {
    id: 'time',
    text: '몇 시부터 몇 시까지 화장실에 있었나요?',
    answer: '9시부터 9시 30분까지 있었어요.',
  },
  {
    id: 'floor',
    text: '어느 층 화장실이었나요?',
    answer: '실습실 바로 위에 있는 4층 화장실이요.',
  },
  {
    id: 'reason',
    text: '화장실에 간 이유가 무엇인가요?',
    answer: '갑자기 배가 아파서 화장실에 갔다 왔어요.',
  },
]

export default function QuestionYideung() {
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
    <main className="yideng-question-shell">
      <img className="yideng-bg" src={bgBlackboard} alt="" draggable="false" />
      <img className="yideng-handcuffs" src={handcuffs} alt="" draggable="false" />

      <header className="yideng-question-header">
        <h1>용의자 심문</h1>
        <p>윤이등</p>
      </header>

      <section className="yideng-file" aria-label="윤이등 심문지">
        <img className="yideng-file-img" src={fileBoard} alt="" draggable="false" />

        <div className="yideng-left-page">
          <article className={`yideng-polaroid ${selected ? 'has-testimony' : ''}`}>
            <img className="yideng-tape yideng-tape-left" src={tape1} alt="" draggable="false" />
            <div className="yideng-photo-slot">
              <img src={yideungPolar} alt="윤이등 증언 사진" draggable="false" />
            </div>
            <p>{selected ? selected.answer : '용의자 증언'}</p>
          </article>
        </div>

        <div className="yideng-center-line" />

        <div className="yideng-right-page">
          <article className="yideng-question-paper">
            <img className="yideng-tape yideng-tape-right" src={tape2} alt="" draggable="false" />

            <p className="yideng-notice">
              궁금한 질문을 모두 확인하세요.
            </p>

            <div className={`yideng-question-list ${selected ? 'is-answered' : ''}`}>
              {QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  className={`yideng-question-btn ${
                    selected?.id === question.id ? 'is-selected' : ''
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
      <EnterHint />
    </main>
  )
}

