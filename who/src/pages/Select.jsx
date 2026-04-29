import { useNavigate } from 'react-router-dom'
import './Select.css'
import bgClass from '../assets/select/bg-class.png'

const DESKS = [
  { id: 'woo',  name: '우팀원', left: '49.6%', top: '70%' },
  { id: 'yun',  name: '윤이등', left: '68.0%', top: '70%' },
  { id: 'jo',   name: '조동창', left: '49.6%', top: '86%' },
  { id: 'kim',  name: '김이레', left: '68.0%', top: '86%' },
]

export default function Select() {
  const navigate = useNavigate()

  return (
    <main className="select-shell">
      <img src={bgClass} alt="" className="select-bg" draggable="false" />

      {DESKS.map((desk) => (
        <button
          key={desk.id}
          type="button"
          className="select-desk-btn"
          style={{ left: desk.left, top: desk.top }}
          onClick={() => navigate(`/suspect/${desk.id}`)}
          aria-label={`${desk.name}의 책상 조사하기`}
        >
          <span className="select-desk-plus">+</span>
          <span className="select-desk-label">{desk.name}의 책상</span>
        </button>
      ))}
    </main>
  )
}
