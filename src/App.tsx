import './App.css'
import { Route, Routes } from 'react-router'
import Reservation from './components/reservation/reservation'
import LoadCardList from "./components/LoadCardList.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
        <LoadCardList/>
    </>
  )
}

export default App
