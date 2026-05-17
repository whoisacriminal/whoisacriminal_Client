import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ending.css'
import endingImage from '../assets/ending/ending5.png'

export default function Ending5() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/ending6')
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
        alt="핏자국을 닦아내는 조동창의 사진"
        draggable="false"
      />

      <p className="ending-caption">
        이내 정신을 차린 조동창은 자신이 저지른 범행에 당황하며 급하게 
        <br />
        핏자국을 닦아내는 등 현장 수습을 시도했다.
      </p>
    </main>
  )
}
