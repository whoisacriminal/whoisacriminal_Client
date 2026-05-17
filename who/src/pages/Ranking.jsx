import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ranking.css'

const currentUserRecord = {
  name: '나',
  playTime: 438,
}

const rankingData = [
  { id: 1, rank: 1, name: '김서연', playTime: 386, isCurrentUser: false },
  { id: 2, rank: 2, name: '박도윤', playTime: 411, isCurrentUser: false },
  { id: 3, rank: 3, name: '나', playTime: 438, isCurrentUser: true },
  { id: 4, rank: 4, name: '이하준', playTime: 462, isCurrentUser: false },
  { id: 5, rank: 5, name: '최지우', playTime: 489, isCurrentUser: false },
  { id: 6, rank: 6, name: '정민준', playTime: 537, isCurrentUser: false },
]

function formatPlayTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}분 ${String(seconds).padStart(2, '0')}초`
}

function getRankLabel(rank) {
  return `${rank}등`
}

export default function Ranking() {
  const navigate = useNavigate()
  const [animatedTime, setAnimatedTime] = useState(0)

  useEffect(() => {
    const duration = 1400
    const startTime = performance.now()
    let animationFrame = 0

    function countUp(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setAnimatedTime(Math.round(currentUserRecord.playTime * easedProgress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="ranking-page">
      <main className="ranking-board" aria-label="플레이 시간 랭킹">
        <section className="ranking-current-panel" aria-labelledby="current-record-title">
          <p className="ranking-eyebrow">오늘의 수사 기록</p>
          <h1 id="current-record-title">내 플레이 시간</h1>
          <div className="ranking-time-display" aria-live="polite">
            {formatPlayTime(animatedTime)}
          </div>
          <p className="ranking-current-name">{currentUserRecord.name}의 기록</p>
          <div className="ranking-chalk-note">칠판에 남겨진 단서처럼 또렷하게 기록되었습니다.</div>
        </section>

        <section className="ranking-list-panel" aria-labelledby="ranking-list-title">
          <div className="ranking-list-header">
            <p className="ranking-eyebrow">CLASS RECORD</p>
            <h2 id="ranking-list-title">플레이 시간 랭킹</h2>
          </div>

          <ol className="ranking-list">
            {rankingData.map((record, index) => {
              const isTopThree = record.rank <= 3
              const classNames = [
                'ranking-card',
                isTopThree ? `ranking-card-top ranking-card-top-${record.rank}` : '',
                record.isCurrentUser ? 'ranking-card-current' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <li
                  key={record.id}
                  className={classNames}
                  style={{ animationDelay: `${180 + index * 110}ms` }}
                >
                  <div className="ranking-rank-wrap">
                    <span className="ranking-rank">{getRankLabel(record.rank)}</span>
                    {isTopThree && <span className="ranking-chalk-star" aria-hidden="true">*</span>}
                  </div>
                  <div className="ranking-user-info">
                    <span className="ranking-user-name">{record.name}</span>
                    {record.isCurrentUser && <span className="ranking-you-label">내 기록</span>}
                  </div>
                  <span className="ranking-user-time">{formatPlayTime(record.playTime)}</span>
                </li>
              )
            })}
          </ol>
        </section>
      </main>

      <button className="ranking-home-button" type="button" onClick={() => navigate('/')}>
        처음으로
      </button>
    </div>
  )
}
