import { useLocation, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import './SelectEvidence.css'
import bg from '../assets/selected_evidence/bg.png'
import kimImg1 from '../assets/selected_evidence/woo/yun/jo/kim/kim1.png'
import leeImg1 from '../assets/selected_evidence/woo/yun/jo/kim/lee/lee1.png'

// 인물별 증거 이미지 목록 — 이미지 추가 시 각 배열에 넣으면 됩니다
const EVIDENCE_MAP = {
  woo: [],
  yun: [],
  jo:  [],
  kim: [kimImg1],
  lee: [leeImg1],
}

export default function SelectEvidence() {
  const { state: character } = useLocation()
  const navigate = useNavigate()

  const evidences = character ? (EVIDENCE_MAP[character.id] ?? []) : []

  const [index, setIndex] = useState(0)

  // 터치 / 마우스 드래그 추적용
  const dragStart = useRef(null)
  const dragging  = useRef(false)

  const prev = () => setIndex((i) => Math.max(i - 1, 0))
  const next = () => setIndex((i) => Math.min(i + 1, evidences.length - 1))

  /* ── 터치 이벤트 (모바일) ── */
  const onTouchStart = (e) => { dragStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (dragStart.current === null) return
    const dx = e.changedTouches[0].clientX - dragStart.current
    if (dx < -50) next()
    else if (dx > 50) prev()
    dragStart.current = null
  }

  /* ── 마우스 드래그 이벤트 (데스크톱) ── */
  const onMouseDown = (e) => { dragStart.current = e.clientX; dragging.current = false }
  const onMouseMove = (e) => { if (dragStart.current !== null) dragging.current = true }
  const onMouseUp   = (e) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    if (dragging.current) {
      if (dx < -50) next()
      else if (dx > 50) prev()
    }
    dragStart.current = null
    dragging.current  = false
  }

  if (!character) {
    return (
      <div className="se-shell">
        <img className="se-bg" src={bg} alt="" />
        <div className="se-fallback">
          <p>인물 정보가 없습니다.</p>
          <button onClick={() => navigate('/select')}>돌아가기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="se-shell">
      <img className="se-bg" src={bg} alt="" />

      {/* 상단 타이틀 */}
      <div className="se-title">{character.name}의 책상</div>

      {/* 뒤로가기 */}
      <button className="se-back-btn" onClick={() => navigate('/select')} aria-label="뒤로가기">
        ←
      </button>

      {/* 증거 캐러셀 영역 */}
      {evidences.length > 0 ? (
        <div className="se-carousel-wrap">
          <div
            className="se-carousel-track"
            style={{ transform: `translateX(calc(-${index * 100}% - ${index * 16}px))` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {evidences.map((src, i) => (
              <div className="se-slide" key={i}>
                <img src={src} alt={`${character.name} 증거 ${i + 1}`} draggable="false" />
              </div>
            ))}
          </div>

          {/* 좌우 버튼 (데스크톱) */}
          {index > 0 && (
            <button className="se-arrow se-arrow--left" onClick={prev} aria-label="이전">‹</button>
          )}
          {index < evidences.length - 1 && (
            <button className="se-arrow se-arrow--right" onClick={next} aria-label="다음">›</button>
          )}

          {/* 인디케이터 */}
          {evidences.length > 1 && (
            <div className="se-dots">
              {evidences.map((_, i) => (
                <button
                  key={i}
                  className={`se-dot${i === index ? ' se-dot--active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}번째 증거`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="se-empty">
          <p>아직 수집된 증거가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
