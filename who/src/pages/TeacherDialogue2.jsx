import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TeacherDialogue2.css'
import classroomBg from '../assets/background/bg-yirea.png'

const FULL_TEXT = '김이레.....? 이게 무슨 일이야......'

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

export default function TeacherDialogue() {
  const navigate = useNavigate()
  const [typedText, setTypedText] = useState('')
  const timersRef = useRef([])

  useEffect(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []

    const schedule = (cb, delay) => {
      const id = window.setTimeout(cb, delay)
      timersRef.current.push(id)
    }

    setTypedText('')

    let charIndex = 0

    const tick = () => {
      charIndex += 1

      setTypedText(FULL_TEXT.slice(0, charIndex))

      if (charIndex < FULL_TEXT.length) {
        schedule(tick, getTypingDelay(FULL_TEXT[charIndex]))
      }
    }

    schedule(tick, 420)

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        navigate('/caseintro')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  return (
    <main className="teacher-dialogue-page" aria-label="교실 대화 장면">
      <img
        className="teacher-dialogue-bg"
        src={classroomBg}
        alt=""
        draggable="false"
      />

      <div className="teacher-dialogue-dim" aria-hidden="true" />
      <section className="teacher-dialogue-panel" aria-label="선생님 대사">
        <div className="teacher-dialogue-line" aria-hidden="true" />
        <p className="teacher-dialogue-name">선생님</p>
        <p className="teacher-dialogue-text">
          {typedText}
          {typedText.length < FULL_TEXT.length && (
            <span className="typing-cursor" />
          )}
        </p>
      </section>
    </main>
  )
}
