import './App.css'
import { Route, Routes } from 'react-router'
import Reservation from './reservation/reservation'
import CardList from "./sessions/CardList.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
      <CardList/>
    </>
  )
}

export default App
