// API 기본 URL (프로덕션 환경에서는 환경 변수로 변경)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// 새 랭킹 기록 생성
export async function createRanking({ name, playTime, criminalCaught, suspectId, suspectName }) {
  try {
    const response = await fetch(`${API_BASE_URL}/rankings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        playTime: Math.round(playTime),
        criminalCaught: criminalCaught ? true : false,
        suspectId: suspectId || null,
        suspectName: suspectName || null,
      }),
    })

    if (!response.ok) {
      throw new Error(`API 에러: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('랭킹 생성 실패:', error)
    throw error
  }
}

// 모든 랭킹 조회
export async function fetchAllRankings() {
  try {
    const response = await fetch(`${API_BASE_URL}/rankings`)

    if (!response.ok) {
      throw new Error(`API 에러: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('랭킹 조회 실패:', error)
    throw error
  }
}

// 특정 사용자의 최신 기록 조회
export async function fetchUserRanking(name) {
  try {
    const response = await fetch(`${API_BASE_URL}/rankings/user/${encodeURIComponent(name)}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API 에러: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('사용자 기록 조회 실패:', error)
    throw error
  }
}

// 최다 지목 통계 조회
export async function fetchMostSuspected() {
  try {
    const response = await fetch(`${API_BASE_URL}/mostsuspected`)

    if (!response.ok) {
      throw new Error(`API 에러: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('지목 통계 조회 실패:', error)
    throw error
  }
}

// 게임 시작 시간 저장
export function setGameStartTime() {
  const startTime = Date.now()
  sessionStorage.setItem('gameStartTime', startTime.toString())
  return startTime
}

// 이전 기록 저장 플래그 제거
export function clearRankSaved(name) {
  if (!name) return
  sessionStorage.removeItem(`rankSaved:${name}`)
}

export function markRankSaved(name) {
  if (!name) return
  sessionStorage.setItem(`rankSaved:${name}`, 'true')
}

export function isRankSaved(name) {
  if (!name) return false
  return sessionStorage.getItem(`rankSaved:${name}`) === 'true'
}

// 게임 플레이 시간(초) 계산
export function getGamePlayTime() {
  const startTime = parseInt(sessionStorage.getItem('gameStartTime') || '0', 10)
  if (!startTime) return 0
  return Math.round((Date.now() - startTime) / 1000)
}

// 게임 시작 시간 초기화
export function clearGameStartTime() {
  sessionStorage.removeItem('gameStartTime')
}
