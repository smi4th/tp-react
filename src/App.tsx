import './App.css'
import { Route, Routes } from 'react-router'
import Reservation from './reservation/reservation'

function App() {
  return (
    <>
      <Routes>
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </>
  )
}

export default App
