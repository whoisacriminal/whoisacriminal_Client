import { useNavigate } from 'react-router-dom'
import './Select.css'
import bgClass from '../assets/select/bg-class.png'

const DESKS = [
  { id: 'woo',  name: '우팀원', left: '49.6%', top: '70%' },
  { id: 'yun',  name: '윤이등', left: '69.0%', top: '70%' },
  { id: 'jo',   name: '조동창', left: '49.6%', top: '86%' },
  { id: 'kim',  name: '김이레', left: '69.0%', top: '86%' },
  { id: 'lee',  name: '이사랑', left: '28.0%', top: '70%' },
]

export default function Select() {
  const navigate = useNavigate()

  return (
    <main className="select-shell">
      <img src={bgClass} alt="" className="select-bg" draggable="false" />

      <div className="select-notice" aria-live="polite">
        단 한사람의 증거만<br />탐색이 가능합니다
      </div>

      {DESKS.map((desk) => (
        <div
          key={desk.id}
          className="select-desk-wrap"
          style={{ left: desk.left, top: desk.top }}
        >
          <button
            type="button"
            className="select-desk-btn"
            onClick={() => navigate(`/suspect/${desk.id}`)}
            aria-label={`${desk.name}의 책상 조사하기`}
          >
            <span className="select-desk-plus">+</span>
          </button>
          <span className="select-desk-label">{desk.name}의 책상</span>
        </div>
      ))}
    </main>
  )
}
