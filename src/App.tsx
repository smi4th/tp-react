import './App.css'
import { Route, Routes } from 'react-router'
import Reservation from './reservation/reservation'
import CardList from "./sessions/CardList.tsx";
import CardListReview from "./reviews/CardListReview.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
      <CardList/>
        <CardListReview/>
    </>
  )
}

export default App
