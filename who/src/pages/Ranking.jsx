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
  { id: 6, rank: 6, name: '이민준', playTime: 537, isCurrentUser: false },
]

function formatPlayTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}분 ${String(seconds).padStart(2, '0')}초`
}

export default function Ranking() {
  const navigate = useNavigate()
  const [animatedTime, setAnimatedTime] = useState(0)

  const myRank = rankingData.find(r => r.isCurrentUser)?.rank ?? '-'
  const animatedMinutes = Math.floor(animatedTime / 60)
  const animatedSeconds = String(animatedTime % 60).padStart(2, '0')

  useEffect(() => {
    let animationFrame = 0
    const delayTimer = setTimeout(() => {
      const duration = 1400
      const startTime = performance.now()

      function countUp(now) {
        const progress = Math.min((now - startTime) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setAnimatedTime(Math.round(currentUserRecord.playTime * easedProgress))
        if (progress < 1) animationFrame = requestAnimationFrame(countUp)
      }

      animationFrame = requestAnimationFrame(countUp)
    }, 400)

    return () => {
      clearTimeout(delayTimer)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="ranking-page">
      <main className="ranking-board">

        {/* ── 왼쪽: 내 기록 카드 ── */}
        <section className="ranking-my-panel">
          <p className="ranking-eyebrow">오늘의 수사 기록</p>
          <h1 className="ranking-my-title">내 플레이 시간</h1>

          <div
            className="ranking-my-time"
            aria-live="polite"
            aria-label={formatPlayTime(animatedTime)}
          >
            <span className="time-group">
              <span className="time-num">{animatedMinutes}</span>
              <span className="time-unit">분</span>
            </span>
            <span className="time-group">
              <span className="time-num">{animatedSeconds}</span>
              <span className="time-unit">초</span>
            </span>
          </div>

          <div className="ranking-rank-stamp">
            CLASS RANK {String(myRank).padStart(2, '0')}
          </div>

          <div className="ranking-my-footer">
            <p className="ranking-my-name">{currentUserRecord.name}의 기록</p>
            <p className="ranking-my-record-no">
              Record No.{String(myRank).padStart(2, '0')}
            </p>
          </div>

          <p className="ranking-flavor-text">오늘의 기록이 칠판에 새겨졌습니다.</p>
        </section>

        {/* ── 오른쪽: 랭킹 기록판 ── */}
        <section className="ranking-board-panel">
          <div className="ranking-board-header">
            <div className="ranking-board-header-labels">
              <p className="ranking-eyebrow ranking-eyebrow--en">CLASS RECORD</p>
              <p className="ranking-today-label">TODAY'S RESULT</p>
            </div>
            <h2 className="ranking-board-title">플레이 시간 랭킹</h2>
          </div>

          <ol className="ranking-list">
            {rankingData.map((record, index) => (
              <li
                key={record.id}
                className={[
                  'ranking-row',
                  record.rank === 1 ? 'ranking-row--first' : '',
                  record.isCurrentUser ? 'ranking-row--me' : '',
                ].filter(Boolean).join(' ')}
                style={{ '--row-delay': `${460 + index * 82}ms` }}
              >
                <span className="ranking-row-num">
                  {String(record.rank).padStart(2, '0')}
                </span>
                <span className="ranking-row-name">{record.name}</span>
                {record.isCurrentUser && (
                  <span className="ranking-row-me-tag">내 기록</span>
                )}
                <span className="ranking-row-time">
                  {formatPlayTime(record.playTime)}
                </span>
              </li>
            ))}
          </ol>
        </section>

      </main>

      <div className="ranking-actions">
        <button
          className="ranking-btn ranking-btn--secondary"
          type="button"
          onClick={() => navigate('/inputname')}
        >
          다시 도전하기
        </button>
        <button
          className="ranking-btn ranking-btn--primary"
          type="button"
          onClick={() => navigate('/')}
        >
          처음 화면으로
        </button>
      </div>
    </div>
  )
}
