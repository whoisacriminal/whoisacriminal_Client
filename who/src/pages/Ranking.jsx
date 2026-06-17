import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ranking.css'
import { fetchAllRankings } from '../utils/api'

function formatPlayTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}분 ${String(seconds).padStart(2, '0')}초`
}

export default function Ranking() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const detectiveName = window.localStorage.getItem('detectiveName') || '익명의 탐정'
  const criminalCaught = window.localStorage.getItem('criminalCaught') === 'true'

  useEffect(() => {
    let active = true

    async function loadRankings() {
      try {
        const rows = await fetchAllRankings()
        if (!active) return

        const sorted = [...rows].sort((a, b) => a.playTime - b.playTime)
        setRecords(sorted)
      } catch (error) {
        if (!active) return
        setFetchError(error.message)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadRankings()
    return () => {
      active = false
    }
  }, [])

  const currentUserIndex = records.findIndex((record) => record.name === detectiveName)
  const myRank = currentUserIndex >= 0 ? currentUserIndex + 1 : '-'
  const myRecord = currentUserIndex >= 0
    ? records[currentUserIndex]
    : {
        name: detectiveName,
        playTime: 0,
        criminalCaught,
      }

  useEffect(() => {
    if (myRecord.playTime && !isNaN(myRecord.playTime)) {
      setAnimatedTime(myRecord.playTime)
    }
  }, [myRecord.playTime])

  const [animatedTime, setAnimatedTime] = useState(myRecord.playTime || 0)
  const animatedMinutes = Math.floor(animatedTime / 60)
  const animatedSeconds = String(animatedTime % 60).padStart(2, '0')
  const arrestStatusLabel = criminalCaught ? '범인 검거 성공' : '범인 검거 실패'

  return (
    <div className="ranking-page">
      <main className="ranking-board">

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

          <div
            className={[
              'ranking-arrest-stamp',
              criminalCaught ? 'ranking-arrest-stamp--success' : 'ranking-arrest-stamp--failed',
            ].join(' ')}
          >
            {arrestStatusLabel}
          </div>

          <div className="ranking-my-footer">
            <p className="ranking-my-name">{myRecord.name}의 기록</p>
            <p className="ranking-my-record-no">
              Record No.{String(myRank).padStart(2, '0')}
            </p>
          </div>

          <p className="ranking-flavor-text">
            {criminalCaught
              ? '검거 결과까지 오늘의 기록에 남았습니다.'
              : '미해결 기록도 칠판에 함께 남았습니다.'}
          </p>
        </section>

        <section className="ranking-board-panel">
          <div className="ranking-board-header">
            <div className="ranking-board-header-labels">
              <p className="ranking-eyebrow ranking-eyebrow--en">CLASS RECORD</p>
              <p className="ranking-today-label">TODAY'S RESULT</p>
            </div>
            <h2 className="ranking-board-title">플레이 시간 랭킹</h2>
          </div>

          {isLoading ? (
            <p className="ranking-loading">랭킹 로딩 중...</p>
          ) : fetchError ? (
            <p className="ranking-error">랭킹을 불러오는 중 문제가 발생했습니다.</p>
          ) : (
            <ol className="ranking-list">
              {records.map((record, index) => (
                <li
                  key={record.id}
                  className={[
                    'ranking-row',
                    index === 0 ? 'ranking-row--first' : '',
                    record.name === detectiveName ? 'ranking-row--me' : '',
                  ].filter(Boolean).join(' ')}
                  style={{ '--row-delay': `${460 + index * 82}ms` }}
                >
                  <span className="ranking-row-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="ranking-row-main">
                    <span className="ranking-row-name">{record.name}</span>
                    {record.name === detectiveName && (
                      <span className="ranking-row-me-tag">내 기록</span>
                    )}
                  </span>
                  <span
                    className={[
                      'ranking-row-arrest',
                      record.criminalCaught ? 'ranking-row-arrest--success' : 'ranking-row-arrest--failed',
                    ].join(' ')}
                  >
                    {record.criminalCaught ? '검거 성공' : '검거 실패'}
                  </span>
                  <span className="ranking-row-time">
                    {formatPlayTime(record.playTime)}
                  </span>
                </li>
              ))}
            </ol>
          )}
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
