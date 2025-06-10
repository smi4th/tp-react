import './App.css'
import { Route, Routes } from 'react-router'
import Reservation from './components/reservation/reservation'
import CardList from "./components/sessions/CardList.tsx";
import CardListReview from "./components/reviews/CardListReview.tsx";

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
