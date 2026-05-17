import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ending.css'
import endingImage from '../assets/ending/ending3.png'

export default function Ending3() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/ending4')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  return (
    <main className="ending-page">
      <h1 className="ending-title">사건의 전말....</h1>

      <img
        className="ending-photo"
        src={endingImage}
        alt="김이레가 조동창에게 에너지 드링크 캔을 던지는 사진"
        draggable="false"
      />

      <p className="ending-caption">
        가만히 개발하던 김이레를 보던 조동창이 그동안의 태도를 따지자,
        <br />
        김이레는 화를 이기지 못하고 마시던 에너지 드링크를 집어 던졌다.
      </p>
    </main>
  )
}
