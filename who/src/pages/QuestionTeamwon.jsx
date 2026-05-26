import { useState } from 'react'
import './QuestionTeamwon.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgBlackboard from '../assets/background/bg-blackboard.png'
import handcuffs from '../assets/start/handcuffs.png'
import fileBoard from '../assets/question/file.png'
import tape1 from '../assets/question/tape1.png'
import tape2 from '../assets/question/tape2.png'
import teamwonPolar from '../assets/suspect/tw-polar.png'

const QUESTIONS = [
  {
    id: 'convenience',
    text: '어떤 편의점에 갔나요?',
    answer: 'GS 편의점에 갔다가 원하는 물건이 없어서 CU 편의점으로 옮겼어요.',
  },
  {
    id: 'purchase',
    text: '무엇을 구매했나요?',
    answer: '밤을 새야 할 것 같아서 커피를 사러 갔어요.',
  },
  {
    id: 'reason',
    text: '몇 시에 나갔다가 몇 시에 돌아왔나요?',
    answer: '9시부터 40분 정도 밖에 있었던 것 같아요.',
  },
]

export default function QuestionTeamwon() {
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
    <main className="teamwon-question-shell">
      <img className="teamwon-bg" src={bgBlackboard} alt="" draggable="false" />
      <img className="teamwon-handcuffs" src={handcuffs} alt="" draggable="false" />

      <header className="teamwon-question-header">
        <h1>용의자 심문</h1>
        <p>우팀원</p>
      </header>

      <section className="teamwon-file" aria-label="우팀원 심문지">
        <img className="teamwon-file-img" src={fileBoard} alt="" draggable="false" />

        <div className="teamwon-left-page">
          <article className={`teamwon-polaroid ${selected ? 'has-testimony' : ''}`}>
            <img className="teamwon-tape teamwon-tape-left" src={tape1} alt="" draggable="false" />
            <div className="teamwon-photo-slot">
              <img src={teamwonPolar} alt="우팀원 증언 사진" draggable="false" />
            </div>
            <p>{selected ? selected.answer : '용의자 증언'}</p>
          </article>
        </div>

        <div className="teamwon-center-line" />

        <div className="teamwon-right-page">
          <article className="teamwon-question-paper">
            <img className="teamwon-tape teamwon-tape-right" src={tape2} alt="" draggable="false" />

            <p className="teamwon-notice">
              궁금한 질문을 모두 확인하세요.
            </p>

            <div className={`teamwon-question-list ${selected ? 'is-answered' : ''}`}>
              {QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  className={`teamwon-question-btn ${
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
    </main>
  )
}

