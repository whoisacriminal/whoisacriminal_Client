import { useEffect, useState } from 'react'
import bg from '../assets/background/bg-blackboard.png'
import './Evidence.css'
import NoirButton from '../components/NoirButton'
import Line from '../assets/enidence/line.svg'
import no1 from '../assets/enidence/no1.png'
import no2 from '../assets/enidence/no2.png'
import no3 from '../assets/enidence/no3.png'

import evidence_no1 from '../assets/enidence/evidence_no1.png'
import evidence_no2 from '../assets/enidence/evidence_no2.png'
import evidence_no3 from '../assets/enidence/evidence_no3.png'

import { useNavigate } from 'react-router-dom'

export default function Evidence() {
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <main
      className={`evidence-shell ${isMounted ? 'is-mounted' : ''}`}
      style={{ '--evidence-bg': `url(${bg})` }}
      aria-label="Evidence scene"
    >
      <section className="evidence-stage" aria-label="Evidence board">
        <h1 className="evidence-title">사건 현장에서 발견된 증거에요</h1>

        <img src={Line} alt="" aria-hidden="true" className="evidence-outline" />

        <img src={no1} alt="증거 1" className="evidence-marker evidence-marker--1" />
        <img src={no2} alt="증거 2" className="evidence-marker evidence-marker--2" />
        <img src={no3} alt="증거 3" className="evidence-marker evidence-marker--3" />

        <figure className="evidence-photo evidence-photo--1" tabIndex={0} aria-label="증거 사진 1 설명 보기">
          <img src={evidence_no1} alt="증거 사진 1" className="evidence-img" />
          <figcaption className="evidence-tooltip evidence-tooltip--left">
            <strong className="evidence-tooltip-title">증거 1</strong>
            <span className="evidence-tooltip-text">피해자 에너지 드링크 : 살해 전까지 마시던 에너지 드링크. 바닥에 떨어져 있다.</span>
          </figcaption>
        </figure>

        <figure className="evidence-photo evidence-photo--2" tabIndex={0} aria-label="증거 사진 2 설명 보기">
          <img src={evidence_no2} alt="증거 사진 2" className="evidence-img" />
          <figcaption className="evidence-tooltip evidence-tooltip--left">
            <strong className="evidence-tooltip-title">증거 2</strong>
            <span className="evidence-tooltip-text">피해자 : 뒷통수를 가격 당한 후 쓰러져 있다.</span>
          </figcaption>
        </figure>

        <figure className="evidence-photo evidence-photo--3" tabIndex={0} aria-label="증거 사진 3 설명 보기">
          <img src={evidence_no3} alt="증거 사진 3" className="evidence-img" />
          <figcaption className="evidence-tooltip evidence-tooltip--right">
            <strong className="evidence-tooltip-title">증거 3</strong>
            <span className="evidence-tooltip-text">피가 묻은 휴지 : 피 묻은 휴지가 휴지통에 잔뜩 버러져 있다. 현장 조작의 증거로 보인다.</span>
          </figcaption>
        </figure>
      </section>
      <NoirButton type="button" className="evidence-start-button" onClick={() => navigate('/investigation')}>
        용의자 보러 가기
      </NoirButton>
    </main>
  )
}
