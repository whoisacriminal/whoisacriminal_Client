import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ranking.css'
import {
  fetchAllRankings,
  createRanking,
  getGamePlayTime,
  clearGameStartTime,
} from '../utils/api'

function formatPlayTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}분 ${String(seconds).padStart(2, '0')}초`
}

export default function Ranking() {
  const navigate = useNavigate()
  const [animatedTime, setAnimatedTime] = useState(0)
  const [allRankings, setAllRankings] = useState([])
  const [currentUserRecord, setCurrentUserRecord] = useState(null)
  const [myRank, setMyRank] = useState('-')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const animatedMinutes = Math.floor(animatedTime / 60)
  const animatedSeconds = String(animatedTime % 60).padStart(2, '0')

  useEffect(() => {
    const initializeRanking = async () => {
      try {
        setLoading(true)

        // 게임 플레이 시간 계산
        const playTime = getGamePlayTime()

        // 사용자 이름 가져오기
        const detectiveName = window.localStorage.getItem('detectiveName') || '탐정'

        // 1. 현재 사용자 기록을 데이터베이스에 저장
        const newRecord = await createRanking(detectiveName, playTime)
        setCurrentUserRecord(newRecord)

        // 2. 모든 랭킹 데이터 조회
        const rankings = await fetchAllRankings()
        setAllRankings(rankings)

        // 3. 현재 사용자의 순위 찾기
        const userRankData = rankings.find((r) => r.id === newRecord.id)
        if (userRankData) {
          setMyRank(userRankData.rank)
        }

        // 4. 게임 시작 시간 초기화
        clearGameStartTime()
      } catch (err) {
        console.error('랭킹 로드 실패:', err)
        setError('랭킹 데이터를 불러올 수 없습니다')
        // 오류 시 로컬 스토리지 데이터 사용
        setCurrentUserRecord({
          name: window.localStorage.getItem('detectiveName') || '탐정',
          playTime: getGamePlayTime(),
        })
      } finally {
        setLoading(false)
      }
    }

    initializeRanking()
  }, [])

  // 플레이 시간 애니메이션
  useEffect(() => {
    if (!currentUserRecord) return

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
  }, [currentUserRecord])

  if (loading) {
    return (
      <div className="ranking-page">
        <main className="ranking-board">
          <p>데이터를 로드 중입니다...</p>
        </main>
      </div>
    )
  }

  if (error) {
    console.warn(error)
  }

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
            CLASS RANK {String(myRank).toString().padStart(2, '0')}
          </div>

          <div className="ranking-my-footer">
            <p className="ranking-my-name">
              {currentUserRecord?.name || '탐정'}의 기록
            </p>
            <p className="ranking-my-record-no">
              Record No.{String(myRank).toString().padStart(2, '0')}
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
            {allRankings.slice(0, 10).map((record, index) => (
              <li
                key={record.id}
                className={[
                  'ranking-row',
                  record.rank === 1 ? 'ranking-row--first' : '',
                  record.id === currentUserRecord?.id ? 'ranking-row--me' : '',
                ].filter(Boolean).join(' ')}
                style={{ '--row-delay': `${460 + index * 82}ms` }}
              >
                <span className="ranking-row-num">
                  {String(record.rank).padStart(2, '0')}
                </span>
                <span className="ranking-row-name">{record.name}</span>
                {record.id === currentUserRecord?.id && (
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
