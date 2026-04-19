import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Intro from './pages/Intro'
import Start from './pages/Start'
import Incidentscene from './pages/Incidentscene'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroRoute />} />
        <Route path="/start" element={<StartRoute />} />
        <Route path="/incidentscene" element={<Incidentscene />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function IntroRoute() {
  const navigate = useNavigate()

  return <Intro onPlay={() => navigate('/start')} />
}

function StartRoute() {
  const navigate = useNavigate()

  return (
    <Start
      onInvestigate={() => navigate('/incidentscene')}
      onSkip={() => navigate('/incidentscene')}
    />
  )
}

export default App
