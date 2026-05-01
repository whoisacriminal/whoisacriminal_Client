import { useParams, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import './Desk.css'
import bgClass from '../assets/select/bg-class.png'

import evidence1 from '../assets/enidence/evidence_no1.png'
import evidence2 from '../assets/enidence/evidence_no2.png'
import evidence3 from '../assets/enidence/evidence_no3.png'

const DESK_DATA = {
  woo: {
    name: '우팀원',
    items: [
      { img: evidence1, caption: 'IT쇼 기획안 — 피해자와 공동 작성한 흔적이 있음' },
      { img: evidence2, caption: '당일 오후 피해자와 주고받은 메시지 기록' },
      { img: evidence3, caption: '책상 서랍 안에서 나온 의심스러운 메모지' },
    ],
  },
  yun: {
    name: '윤이등',
    items: [
      { img: evidence1, caption: '가방에서 나온 전교1등 성적표' },
      { img: evidence2, caption: '피해자와의 경쟁을 암시하는 일기 페이지' },
      { img: evidence3, caption: '사건 당일 알리바이 관련 메모' },
    ],
  },
  jo: {
    name: '조동창',
    items: [
      { img: evidence1, caption: '중학교 시절 피해자와 찍은 사진' },
      { img: evidence2, caption: '정체불명의 약품 구매 영수증' },
      { img: evidence3, caption: '피해자 관련 수집 기록' },
    ],
  },
  kim: {
    name: '김이레',
    items: [
      { img: evidence1, caption: '피해자의 개인 노트' },
      { img: evidence2, caption: '마지막으로 작성된 일정표' },
      { img: evidence3, caption: '의문의 접선 메모' },
    ],
  },
  lee: {
    name: '이사랑',
    items: [
      { img: evidence1, caption: '피해자에게 쓴 미완성 편지' },
      { img: evidence2, caption: '감정적으로 기록된 일기장' },
      { img: evidence3, caption: '사건 당일 행적이 적힌 메모' },
    ],
  },
}

const SWIPE_THRESHOLD = 50

export default function Desk() {
  const { id } = useParams()
  const navigate = useNavigate()
  const desk = DESK_DATA[id]

  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  if (!desk) {
    navigate('/select', { replace: true })
    return null
  }

  const goTo = (next) => {
    setIndex((next + desk.items.length) % desk.items.length)
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) >= SWIPE_THRESHOLD) goTo(index + (delta > 0 ? 1 : -1))
    touchStartX.current = null
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1)
    if (e.key === 'ArrowLeft') goTo(index - 1)
  }

  return (
    <main
      className="desk-shell"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={`${desk.name}의 책상 증거 탐색`}
    >
      <img src={bgClass} alt="" className="desk-bg" draggable="false" />
      <div className="desk-overlay" />

      <h1 className="desk-title">{desk.name}의 책상</h1>

      <div className="desk-carousel">
        <button
          type="button"
          className="desk-arrow desk-arrow--left"
          onClick={() => goTo(index - 1)}
          aria-label="이전 증거"
        >
          ‹
        </button>

        <div className="desk-card-wrap">
          {desk.items.map((item, i) => (
            <figure
              key={i}
              className={`desk-card ${
                i === index ? 'is-active' : i === (index + 1) % desk.items.length ? 'is-next' : 'is-prev'
              }`}
              aria-hidden={i !== index}
            >
              <img src={item.img} alt={item.caption} className="desk-card-img" />
              <figcaption className="desk-card-caption">{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="desk-arrow desk-arrow--right"
          onClick={() => goTo(index + 1)}
          aria-label="다음 증거"
        >
          ›
        </button>
      </div>

      <div className="desk-dots" role="tablist" aria-label="증거 목록">
        {desk.items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`desk-dot ${i === index ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`증거 ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="desk-back-btn"
        onClick={() => navigate('/select')}
        aria-label="책상 선택으로 돌아가기"
      >
        ← 돌아가기
      </button>
    </main>
  )
}
