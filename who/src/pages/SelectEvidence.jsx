import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import './SelectEvidence.css'
import bg from '../assets/selected_evidence/bg.png'
import kimImg1 from '../assets/selected_evidence/kim/kim1.png'
import kimImg2 from '../assets/selected_evidence/kim/kim2.png'
import leeImg1 from '../assets/selected_evidence/lee/lee1.png'
import leeImg2 from '../assets/selected_evidence/lee/lee2.png'
import leeImg3 from '../assets/selected_evidence/lee/lee3.png'

import wooImg1 from '../assets/selected_evidence/woo/woo1.png'
import wooImg2 from '../assets/selected_evidence/woo/woo2.png'
import wooImg3 from '../assets/selected_evidence/woo/woo3.png'

import yunImg1 from '../assets/selected_evidence/yun/yun1.png'
import yunImg2 from '../assets/selected_evidence/yun/yun2.png'
import yunImg3 from '../assets/selected_evidence/yun/yun3.png'

import joImg1 from '../assets/selected_evidence/jo/jo1.png'
import joImg2 from '../assets/selected_evidence/jo/jo2.png'

const NEXT_ROUTE = '/questionselect'

const CHARACTER_MAP = {
  woo: { id: 'woo', name: '우팀원' },
  yun: { id: 'yun', name: '윤이등' },
  jo: { id: 'jo', name: '조동창' },
  kim: { id: 'kim', name: '김이레' },
  lee: { id: 'lee', name: '이사랑' },
}

// 인물별 증거 이미지 목록
// 사진 부가 설명을 추가하려면 아래 description: '' 안에 원하는 문장을 넣으면 됩니다.
// 예) { src: wooImg1, description: '책상 위에 남아 있던 수상한 메모.' }
// 사진을 추가하려면 import를 먼저 추가한 뒤, 해당 인물 배열에 { src: 새이미지, description: '설명' } 형식으로 넣으면 됩니다.
const EVIDENCE_MAP = {
  woo: [
    { src: wooImg1, description: '우팀원의 핸드폰에서 발견된 결제 내역' },
    { src: wooImg2, description: '우팀원의 핸드폰에서 발견된 카톡' },
    { src: wooImg3, description: '우팀원 밖에 기록되지 않은 커밋 내역' },
  ],
  yun: [
    { src: yunImg1, description: '윤이등이 가지고 있었던 동아리 명단' },
    { src: yunImg2, description: '윤이등 가방에 있던 메모지' },
    { src: yunImg3, description: '가방에서 나온 전교2등 성적표 ' },
  ],
  jo: [
    { src: joImg1, description: '학교 교무실 CCTV 캡쳐 장면' },
    { src: joImg2, description: '조동창의 일기장 중 한 페이지' },
  ],
  kim: [
    { src: kimImg1, description: '가방에서 나온 전교1등 성적표' },
    { src: kimImg2, description: '김이레 노트북에서 발견된 비주얼스튜디오코드 커밋창' },
  ],
  lee: [
    { src: leeImg1, description: '가방에서 나온 김이레, 송지훈의 사진 근데 왜 이사랑이 가지고 있지?' },
    { src: leeImg2, description: '이사랑과 김이레의 카톡 내용' },
    { src: leeImg3, description: '집 가기 전 버스 카드를 충전한 내역' },
  ],
}

export default function SelectEvidence() {
  const { state: character } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const characterId = character?.id ?? searchParams.get('character')
  const selectedCharacter = character ?? CHARACTER_MAP[characterId]
  const evidences = selectedCharacter ? (EVIDENCE_MAP[selectedCharacter.id] ?? []) : []
  const [index, setIndex] = useState(0)

  const finishEvidence = useCallback(() => {
    navigate(NEXT_ROUTE, { replace: true })
  }, [navigate])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        finishEvidence()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [finishEvidence])

  // 터치 / 마우스 드래그 추적용
  const dragStart = useRef(null)
  const dragging  = useRef(false)

  const prev = () => setIndex((i) => Math.max(i - 1, 0))
  const next = () => {
    setIndex((i) => {
      if (i >= evidences.length - 1) {
        finishEvidence()
        return i
      }

      return i + 1
    })
  }
  const getSlideClassName = (slideIndex) => {
    const offset = slideIndex - index

    if (offset === 0) return 'se-slide se-slide--active'
    if (offset === -1) return 'se-slide se-slide--prev'
    if (offset === 1) return 'se-slide se-slide--next'

    return 'se-slide se-slide--hidden'
  }

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
  const onMouseMove = () => { if (dragStart.current !== null) dragging.current = true }
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

  if (!selectedCharacter) {
    return (
      <div className="se-shell">
        <img className="se-bg" src={bg} alt="" />
        <div className="se-fallback">
          <p>인물 정보가 없습니다.</p>
          <button onClick={finishEvidence}>돌아가기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="se-shell">
      <img className="se-bg" src={bg} alt="" />

      {/* 상단 타이틀 */}
      <div className="se-title">{selectedCharacter.name}의 책상</div>

      {/* 뒤로가기 */}
      <button className="se-back-btn" onClick={finishEvidence} aria-label="다음으로 가기">
        ←
      </button>

      {/* 증거 캐러셀 영역 */}
      {evidences.length > 0 ? (
        <div className="se-carousel-wrap">
          <div
            className="se-carousel-track"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {evidences.map((evidence, i) => (
              <div className={getSlideClassName(i)} key={i}>
                <img src={evidence.src} alt={`${selectedCharacter.name} 증거 ${i + 1}`} draggable="false" />
              </div>
            ))}
          </div>

          {evidences[index]?.description && (
            <p className="se-description">{evidences[index].description}</p>
          )}

          {/* 좌우 버튼 (데스크톱) */}
          {index > 0 && (
            <button className="se-arrow se-arrow--left" onClick={prev} aria-label="이전">‹</button>
          )}
          <button className="se-arrow se-arrow--right" onClick={next} aria-label="다음">›</button>

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
