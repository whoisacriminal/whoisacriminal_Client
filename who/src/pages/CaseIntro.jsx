import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CaseIntro.css'
import paperBg from '../assets/background/bg-paper.png'
import coffeeStain from '../assets/background/coffee-stain.png'
import coffeeCircle from '../assets/background/coffee-circle.png'

const CASE_LINES = [
  '2026년 6월 17일 밤 10시\nIT쇼 하루 전 날, 미림마이스터고 실습실\n3학년 학생 김이레가 숨진 채 발견됐다',
  '경찰은 외부 침입 흔적이 없다고 보고\n같이 실습실에 있던 학생들을 용의자로 본다',
]

function getTypingDelay(character) {
  if (character === '\n') return 180
  if (/[.,:;!?]/.test(character)) return 130
  if (/\s/.test(character)) return 70
  return 42
}

export default function CaseIntro() {
  const navigate = useNavigate()
  const [typedLines, setTypedLines] = useState(['', ''])
  const [activeLineIndex, setActiveLineIndex] = useState(-1)
  const timersRef = useRef([])

  useEffect(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []

    const schedule = (cb, delay) => {
      const id = window.setTimeout(cb, delay)
      timersRef.current.push(id)
    }

    setTypedLines(['', ''])
    setActiveLineIndex(-1)

    const typeLine = (lineIndex) => {
      if (lineIndex >= CASE_LINES.length) {
        setActiveLineIndex(-1)
        return
      }

      const fullText = CASE_LINES[lineIndex]
      let charIndex = 0
      setActiveLineIndex(lineIndex)

      const tick = () => {
        charIndex += 1

        setTypedLines((prev) => {
          const next = [...prev]
          next[lineIndex] = fullText.slice(0, charIndex)
          return next
        })

        if (charIndex < fullText.length) {
          schedule(tick, getTypingDelay(fullText[charIndex]))
        } else {
          schedule(() => typeLine(lineIndex + 1), 720)
        }
      }

      schedule(tick, lineIndex === 0 ? 520 : 0)
    }

    typeLine(0)

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        navigate('/start')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  return (
    <main className="case-intro-page" aria-label="사건 개요">
      <img
        className="case-intro-paper"
        src={paperBg}
        alt=""
        draggable="false"
      />
      <img
        className="case-intro-stain case-intro-stain-left"
        src={coffeeStain}
        alt=""
        draggable="false"
      />
      <img
        className="case-intro-stain case-intro-stain-right"
        src={coffeeCircle}
        alt=""
        draggable="false"
      />
      <div className="case-intro-shade" aria-hidden="true" />

      <section className="case-intro-copy">
        {CASE_LINES.map((line, i) => {
          const isActive = i === activeLineIndex
          const isComplete = typedLines[i].length === line.length

          return (
            <p key={line}>
              {typedLines[i]}
              {isActive && !isComplete && (
                <span className="case-intro-cursor" aria-hidden="true" />
              )}
            </p>
          )
        })}
      </section>
    </main>
  )
}
