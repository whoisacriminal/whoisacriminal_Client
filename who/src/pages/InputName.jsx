import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './InputName.css'
import NoirButton from '../components/NoirButton'
import bgMain from '../assets/start/bg-main.png'

const TITLE_LINES = [
  '당신은 사건을 조사하는 탐정입니다.',
  '닉네임을 적어주세요.',
]

function getTypingDelay(character) {
  if (/[.,:;!?]/.test(character)) return 250
  if (/\s/.test(character)) return 100
  return 40
}

export default function InputName() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [typedLines, setTypedLines] = useState(['', ''])
  const [activeLineIndex, setActiveLineIndex] = useState(-1)
  const [formVisible, setFormVisible] = useState(false)
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
      if (lineIndex >= TITLE_LINES.length) {
        setActiveLineIndex(-1)
        schedule(() => setFormVisible(true), 300)
        return
      }

      const fullText = TITLE_LINES[lineIndex]
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
          const pause = lineIndex === TITLE_LINES.length - 1 ? 220 : 280
          schedule(() => typeLine(lineIndex + 1), pause)
        }
      }

      schedule(tick, lineIndex === 0 ? 340 : 110)
    }

    schedule(() => typeLine(0), 420)

    return () => timersRef.current.forEach((id) => window.clearTimeout(id))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    navigate('/start')
  }

  return (
    <main
      className="inputname-shell"
      style={{ '--backdrop-image': `url(${bgMain})` }}
    >
      <div className="inputname-content">
        <div className="inputname-title">
          {TITLE_LINES.map((line, i) => {
            const isActive = i === activeLineIndex
            const isComplete = typedLines[i].length === line.length
            return (
              <p key={i}>
                {typedLines[i]}
                {isActive && !isComplete && (
                  <span className="inputname-cursor" aria-hidden="true" />
                )}
              </p>
            )
          })}
        </div>

        <form className={`inputname-form${formVisible ? ' is-visible' : ''}`} onSubmit={handleSubmit}>
          <div className="inputname-row">
            <span className="inputname-label">탐정 닉네임</span>
            <input
              className="inputname-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <NoirButton type="submit">
            조사 시작
          </NoirButton>
        </form>
      </div>
    </main>
  )
}
