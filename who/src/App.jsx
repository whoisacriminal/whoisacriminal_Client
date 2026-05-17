import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Intro from './pages/Intro'
import Start from './pages/Start'
import Incidentscene from './pages/Incidentscene'
import InputName from './pages/InputName'
import Evidence from './pages/Evidence'
import SuspectBoard from './pages/SuspectBoard'
import Select from './pages/Select'
import QuestionSelect from './pages/QuestionSelect'
import SelectEvidence from './pages/SelectEvidence'
import QuestionYideung from './pages/QuestionYideung'
import QuestionTeamwon from './pages/QuestionTeamwon'
import QuestionSarang from './pages/QuestionSarang'
import QuestionDongchang from './pages/QuestionDongchang'
import FinalSelect from './pages/FinalSelect'
import TruthReveal from './pages/TruthReveal'
import MissonCompleted from './pages/MissonCompleted'
import MissonFailed from './pages/MissonFailed'
import Ranking from './pages/Ranking'

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
        <Route path="/questionselect" element={<QuestionSelect />} />
        <Route path="/selectevidence" element={<SelectEvidence />} />
        <Route path="/yideungquestion" element={<QuestionYideung />} />
        <Route path="/teamwonquestion" element={<QuestionTeamwon />} />
        <Route path="/sarangquestion" element={<QuestionSarang />} />
        <Route path="/dongchangquestion" element={<QuestionDongchang />} />
        <Route path="/finalselect" element={<FinalSelect />} />
        <Route path="/truthreveal" element={<TruthReveal />} />
        <Route path="/missioncompleted" element={<MissonCompleted />} />
        <Route path="/missionfailed" element={<MissonFailed />} />
        <Route path="/ranking" element={<Ranking />} />
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
