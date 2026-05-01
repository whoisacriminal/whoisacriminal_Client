import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Intro from './pages/Intro'
import Start from './pages/Start'
import Incidentscene from './pages/Incidentscene'
import InputName from './pages/InputName'
import Evidence from './pages/Evidence'
import SuspectBoard from './pages/SuspectBoard'
import Select from './pages/Select'
import Desk from './pages/Desk'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroRoute />} />
        <Route path="/start" element={<StartRoute />} />
        <Route path="/incidentscene" element={<Incidentscene />} />
        <Route path="/inputname" element={<InputName />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/suspectboard" element={<SuspectBoard />} />
        <Route path="/select" element={<Select />} />
        <Route path="/suspect/:id" element={<Desk />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function IntroRoute() {
  const navigate = useNavigate()

  return <Intro onPlay={() => navigate('/inputname')} />
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
