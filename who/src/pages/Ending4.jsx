import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ending.css'
import endingImage from '../assets/ending/ending4.png'

export default function Ending4() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/ending5')
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
        alt="김이레의 뒤에서 키보드를 들고있는 조동창의 사진"
        draggable="false"
      />

      <p className="ending-caption">
        억눌렸던 분노가 폭발한 조동창은 자리에 앉은 김이레의 뒤통수를 
        <br />
        키보드로 내리쳤고, 쓰러진 후에도 무자비하게 폭행했다.
      </p>
    </main>
  )
}
