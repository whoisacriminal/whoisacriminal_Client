import { useEffect, useRef, useState } from 'react'
import './Start.css'
import bgMain from '../assets/start/bg-main.png'
import filechart from '../assets/start/filechart.png'
import handcuffs from '../assets/start/handcuffs.png'
import handpring from '../assets/start/handprint.png'

const STAGE_WIDTH = 1440
const STAGE_HEIGHT = 1024

const CASE_ROWS = [
  { label: '피해자 이름', value: '김이레' },
  { label: '사망장소', value: '실습실' },
  { label: '사망 추정 시간', value: 'PM 21:20 ~ 21:40' },
  { label: '특이 사항', value: '미림 마이스터고 소프트웨어과 전교 1등' },
  {
    label: '비고',
    value: '노트북 앞에 앉아 있었다가\n사망 후엔 책상에 엎드려 있었음\n머리 뒷통수를 맞아 피를 흘리고 있었음',
  },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function getInitialScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  const widthScale = window.innerWidth / STAGE_WIDTH
  const heightScale = window.innerHeight / STAGE_HEIGHT

  return Math.min(widthScale, heightScale)
}

function getTypingDelay(character) {
  if (character === '\n') {
    return 150
  }

  if (/[.,:;!?]/.test(character)) {
    return 110
  }

  if (/\s/.test(character)) {
    return 55
  }

  return 28
}

function DecorativeAsset({ className, floatClass, src, alt, style }) {
  return (
    <div className={`start-decor ${className}`} style={style} aria-hidden="true">
      <div className={`start-decor-float ${floatClass}`}>
        <img src={src} alt={alt} draggable="false" />
      </div>
    </div>
  )
}

function Start({ onInvestigate, onSkip }) {
  const shellRef = useRef(null)
  const typeTimersRef = useRef([])
  const [stageScale, setStageScale] = useState(() => getInitialScale())
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [typedRows, setTypedRows] = useState(() => CASE_ROWS.map(() => ''))
  const [activeRowIndex, setActiveRowIndex] = useState(-1)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches)

    updateMotionPreference()

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', updateMotionPreference)

      return () => media.removeEventListener('change', updateMotionPreference)
    }

    media.addListener(updateMotionPreference)

    return () => media.removeListener(updateMotionPreference)
  }, [])

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / STAGE_WIDTH
      const heightScale = window.innerHeight / STAGE_HEIGHT
      const nextScale = Math.min(widthScale, heightScale)

      setStageScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1)
    }

    updateScale()
    window.addEventListener('resize', updateScale, { passive: true })

    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true))

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    typeTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
    typeTimersRef.current = []

    const startTimer = window.setTimeout(() => {
      const schedule = (callback, delay) => {
        const timerId = window.setTimeout(callback, delay)
        typeTimersRef.current.push(timerId)
        return timerId
      }

      if (prefersReducedMotion) {
        setTypedRows(CASE_ROWS.map(({ value }) => value))
        setActiveRowIndex(-1)
        return
      }

      setTypedRows(CASE_ROWS.map(() => ''))
      setActiveRowIndex(-1)

      const typeRow = (rowIndex) => {
        if (rowIndex >= CASE_ROWS.length) {
          setActiveRowIndex(-1)
          return
        }

        const fullText = CASE_ROWS[rowIndex].value
        let charIndex = 0

        setActiveRowIndex(rowIndex)

        const tick = () => {
          charIndex += 1

          setTypedRows((previousRows) => {
            const nextRows = [...previousRows]
            nextRows[rowIndex] = fullText.slice(0, charIndex)
            return nextRows
          })

          if (charIndex < fullText.length) {
            const nextCharacter = fullText[charIndex]
            schedule(tick, getTypingDelay(nextCharacter))
            return
          }

          const pause = rowIndex === CASE_ROWS.length - 1 ? 220 : 280
          schedule(() => typeRow(rowIndex + 1), pause)
        }

        schedule(tick, rowIndex === 0 ? 340 : 110)
      }

      schedule(() => typeRow(0), 420)
    }, 0)

    typeTimersRef.current.push(startTimer)

    return () => {
      window.clearTimeout(startTimer)
      typeTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
      typeTimersRef.current = []
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const updateParallax = (event) => {
      if (!shellRef.current || prefersReducedMotion) {
        return
      }

      const shell = shellRef.current
      const rect = shell.getBoundingClientRect()

      if (!rect.width || !rect.height) {
        return
      }

      const rawX = (event.clientX - rect.left) / rect.width
      const rawY = (event.clientY - rect.top) / rect.height
      const x = clamp(rawX, 0, 1)
      const y = clamp(rawY, 0, 1)

      shell.style.setProperty('--pointer-x', `${(x - 0.5) * 2}`)
      shell.style.setProperty('--pointer-y', `${(y - 0.5) * 2}`)
    }

    const resetParallax = () => {
      if (!shellRef.current) {
        return
      }

      shellRef.current.style.setProperty('--pointer-x', '0')
      shellRef.current.style.setProperty('--pointer-y', '0')
    }

    const shell = shellRef.current

    if (!shell) {
      return undefined
    }

    shell.addEventListener('pointermove', updateParallax)
    shell.addEventListener('pointerleave', resetParallax)

    return () => {
      shell.removeEventListener('pointermove', updateParallax)
      shell.removeEventListener('pointerleave', resetParallax)
    }
  }, [prefersReducedMotion])

  const handleInvestigate = () => {
    // TODO: navigate to /incidentscene
    if (typeof onInvestigate === 'function') {
      onInvestigate()
    }
    navigation.navigate('/evidence')
  }

  const handleSkip = () => {
    // TODO: navigate to /incidentscene
    if (typeof onSkip === 'function') {
      onSkip()
    }
  }

  const shellClassName = [
    'start-shell',
    isMounted ? 'is-mounted' : '',
    prefersReducedMotion ? 'reduce-motion' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <main
      ref={shellRef}
      className={shellClassName}
      style={{
        '--stage-scale': `${stageScale}`,
        '--backdrop-image': `url(${bgMain})`,
      }}
      aria-label="Crime investigation start screen"
    >
      <div className="shell-backdrop" aria-hidden="true" />

      <section className="start-stage" aria-label="Case file intro">
        <img className="start-background" src={bgMain} alt="" aria-hidden="true" draggable="false" />
        <div className="start-vignette" aria-hidden="true" />

        <div className="start-content">
          <DecorativeAsset
            className="start-handcuffs"
            floatClass="float-handcuffs"
            src={handcuffs}
            alt=""
            style={{
              '--enter-delay': '120ms',
              '--parallax-x': '10px',
              '--parallax-y': '8px',
              '--hover-scale': '1.04',
              '--tilt': '-11deg',
            }}
          />
          <div className="title">
            <p>사건 번호 01</p>
            <h1>실습실 살인사건</h1>
          </div>
          <div className="filechart-wrap">
            <img className="filechart" src={filechart} alt="" aria-hidden="true" draggable="false" />

            <div className="case-sheet" aria-label="Victim case table">
              <table className="case-table">
                <tbody>
                  {CASE_ROWS.map((row, rowIndex) => {
                    const rowText = typedRows[rowIndex] ?? ''
                    const isActive = rowIndex === activeRowIndex
                    const isComplete = rowText.length === row.value.length

                    return (
                      <tr
                        key={row.label}
                        className={`case-row ${isActive ? 'is-active' : ''} ${rowIndex === CASE_ROWS.length - 1 ? 'is-note' : ''}`}
                      >
                        <th scope="row" className="case-label">
                          <span className="case-label-text">{row.label}</span>
                        </th>
                        <td className={`case-value ${rowIndex === CASE_ROWS.length - 1 ? 'is-note' : ''}`}>
                          <span className="case-text" aria-live={isActive ? 'polite' : 'off'}>
                            {rowText}
                          </span>
                          {isActive && !isComplete ? <span className="typing-cursor" aria-hidden="true" /> : null}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <DecorativeAsset
            className="start-handprint"
            floatClass="float-handprint"
            src={handpring}
            alt=""
            style={{
              '--enter-delay': '180ms',
              '--parallax-x': '12px',
              '--parallax-y': '10px',
              '--hover-scale': '1.04',
              '--tilt': '13deg',
            }}
          />

          <div className="start-actions" aria-label="Start actions">
            <button type="button" className="start-action start-action--primary" onClick={handleInvestigate}>
              조사하기
            </button>
            <button type="button" className="start-action start-action--secondary" onClick={handleSkip}>
              건너뛰기
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Start
