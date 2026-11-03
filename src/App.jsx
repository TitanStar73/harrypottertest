import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './pages/Home/Home'
import { Biography } from './pages/Biography/Biography'
import { HogwartsYears } from './pages/HogwartsYears/HogwartsYears'
import { Friends } from './pages/Friends/Friends'
import { Enemies } from './pages/Enemies/Enemies'
import { Magic } from './pages/Magic/Magic'
import { TimelinePage } from './pages/Timeline/Timeline'
import { Gallery } from './pages/Gallery/Gallery'
import { WandCursor } from './components/WandCursor/WandCursor'

function App() {
  return (
    <>
      <WandCursor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="biography" element={<Biography />} />
          <Route path="hogwarts-years" element={<HogwartsYears />} />
          <Route path="friends" element={<Friends />} />
          <Route path="enemies" element={<Enemies />} />
          <Route path="magic" element={<Magic />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App