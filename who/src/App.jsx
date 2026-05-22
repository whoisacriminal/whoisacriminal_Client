import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Intro from './pages/Intro'
import Start from './pages/Start'
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
import Ending1 from './pages/Ending1'
import Ending2 from './pages/Ending2'
import Ending3 from './pages/Ending3'
import Ending4 from './pages/Ending4'
import Ending5 from './pages/Ending5'
import Ending6 from './pages/Ending6'
import Ranking from './pages/Ranking'
import TeacherDialogue1 from './pages/TeacherDialogue1'
import TeacherDialogue2 from './pages/TeacherDialogue2'
import CaseIntro from './pages/CaseIntro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroRoute />} />
        <Route path="/start" element={<StartRoute />} />
        <Route path="/inputname" element={<InputName />} />
        <Route path="/teacherdialogue1" element={<TeacherDialogue1 />} />
        <Route path="/teacherdialogue2" element={<TeacherDialogue2 />} />
        <Route path="/caseintro" element={<CaseIntro />} />
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
        <Route path="/ending1" element={<Ending1 />} />
        <Route path="/ending2" element={<Ending2 />} />
        <Route path="/ending3" element={<Ending3 />} />
        <Route path="/ending4" element={<Ending4 />} />
        <Route path="/ending5" element={<Ending5 />} />
        <Route path="/ending6" element={<Ending6 />} />
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
      onInvestigate={() => navigate('/evidence')}
    />
  )
}

export default App
