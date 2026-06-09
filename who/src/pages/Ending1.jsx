import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ending.css'
import EnterHint from '../components/EnterHint'
import endingImage from '../assets/ending/ending1.png'

export default function Ending1() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/ending2')
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
        alt="컴퓨터실에서 조동창과 김이레가 함께 있는 사진"
        draggable="false"
      />

      <p className="ending-caption">
        조동창은 평소 김이레에게 개발 실력으로 무시당해왔으며, 사건
        <br />
        일주일 전 공개적인 조롱까지 듣고 깊은 분노를 품게 되었다.
      </p>
      <EnterHint />
    </main>
  )
}
