import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ending.css'
import endingImage from '../assets/ending/ending2.png'

export default function Ending2() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/ending3')
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
        alt="컴퓨터실에서 가방을 들고있는 조동창의 사진"
        draggable="false"
      />

      <p className="ending-caption">
        사건 당일 밤 9시 30분, 교무실에 갔다가 가방을 찾으러 실습실에
        <br />
        돌아온 조동창은 홀로 남아 작업 중이던 김이레와 마주쳤다.
      </p>
    </main>
  )
}
