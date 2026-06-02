import { useNavigate } from 'react-router-dom'
import './MostSuspected.css'

import yideungPhoto from '../assets/suspect/yideung.png'
import teamwonPhoto from '../assets/suspect/teamwon.png'
import sarangPhoto from '../assets/suspect/sarang.png'
import dongchangPhoto from '../assets/suspect/dongchang.png'

const suspectVotes = [
  {
    name: '이등',
    percentage: 42,
    photo: yideungPhoto,
  },
  {
    name: '팀원',
    percentage: 28,
    photo: teamwonPhoto,
  },
  {
    name: '사랑',
    percentage: 19,
    photo: sarangPhoto,
  },
  {
    name: '동창',
    percentage: 11,
    photo: dongchangPhoto,
  },
]

function MostSuspected() {
  const navigate = useNavigate()
  const sortedSuspects = [...suspectVotes].sort((a, b) => b.percentage - a.percentage)

  return (
    <main className="most-suspected-page">
      <h1 className="most-suspected-title">최다 지목 용의자</h1>

      <section className="suspect-photo-list" aria-label="용의자 득표율">
        {sortedSuspects.map((suspect) => (
          <article className="suspect-photo-card" key={suspect.name}>
            <div className="suspect-photo-frame">
              <img src={suspect.photo} alt={`${suspect.name} 증명사진`} />
            </div>
            <strong>{suspect.percentage}%</strong>
            <div className="suspect-percent-bar" aria-hidden="true">
              <span style={{ width: `${suspect.percentage}%` }} />
            </div>
          </article>
        ))}
      </section>

      <button className="most-suspected-back" type="button" onClick={() => navigate('/ranking')}>
        랭킹 확인
      </button>
    </main>
  )
}

export default MostSuspected
