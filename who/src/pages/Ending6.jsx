import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ending.css'
import endingImage from '../assets/ending/ending6.png'

export default function Ending6() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        window.location.href = '/mostsuspected'
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/ranking')
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
        alt="복도로 뛰쳐나가는 조동창의 사진"
        draggable="false"
      />

      <p className="ending-caption">
        이후 조동창은 완전 범죄를 꿈꾸며 서둘러 흔적을 지우고 쫓기듯이 
        <br />
        실습실을 빠져나가 도주했다.
      </p>
    </main>
  )
}
