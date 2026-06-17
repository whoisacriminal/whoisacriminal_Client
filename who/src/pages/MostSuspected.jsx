import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MostSuspected.css'
import { fetchMostSuspected } from '../utils/api'

import yideungPhoto from '../assets/suspect/yideung.png'
import teamwonPhoto from '../assets/suspect/teamwon.png'
import sarangPhoto from '../assets/suspect/sarang.png'
import dongchangPhoto from '../assets/suspect/dongchang.png'

const suspectPhotos = {
  yun: yideungPhoto,
  woo: teamwonPhoto,
  lee: sarangPhoto,
  jo: dongchangPhoto,
}

export default function MostSuspected() {
  const navigate = useNavigate()
  const [suspects, setSuspects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    let active = true

    async function loadSuspects() {
      try {
        const rows = await fetchMostSuspected()
        if (!active) return

        const total = rows.reduce((sum, row) => sum + row.picks, 0)
        const normalized = rows
          .map((row) => ({
            ...row,
            percentage: total > 0 ? Math.round((row.picks / total) * 100) : 0,
            photo: suspectPhotos[row.suspectId] || yideungPhoto,
          }))
          .sort((a, b) => b.picks - a.picks)

        setSuspects(normalized)
      } catch (error) {
        if (!active) return
        setFetchError(error.message)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadSuspects()
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="most-suspected-page">
      <h1 className="most-suspected-title">최다 지목 용의자</h1>

      {isLoading ? (
        <p className="most-suspected-loading">지목 통계를 불러오는 중입니다...</p>
      ) : fetchError ? (
        <p className="most-suspected-error">지목 통계를 불러오는 중 문제가 발생했습니다.</p>
      ) : (
        <section className="suspect-photo-list" aria-label="용의자 득표율">
          {suspects.map((suspect) => (
            <article className="suspect-photo-card" key={suspect.suspectId}>
              <div className="suspect-photo-frame">
                <img src={suspect.photo} alt={`${suspect.suspectName} 증명사진`} />
              </div>
              <strong>{suspect.picks}표</strong>
              <p className="suspect-rank-label">{suspect.percentage}%</p>
              <div className="suspect-percent-bar" aria-hidden="true">
                <span style={{ width: `${suspect.percentage}%` }} />
              </div>
            </article>
          ))}
        </section>
      )}

      <button className="most-suspected-back" type="button" onClick={() => navigate('/ranking')}>
        랭킹 확인
      </button>
    </main>
  )
}
