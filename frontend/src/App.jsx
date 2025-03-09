import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchPage from "./Pages/SearchPage.jsx";
import DetailPage from "./Pages/DetailPage.jsx";
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    Routes
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  // const fetchStuff = async() => {
  //   const response = await fetch(import.meta.env.VITE_API_URL)
  // }
  return (
    <>
      <h1>OMDB project</h1>
      {/*<button onClick={fetchStuff}>klicka</button>*/}
      <Router>
          <Routes>
            <Route path={"/"} element={<SearchPage />} />
            <Route path={"/movies/:id"} element={<DetailPage />} />
          </Routes>
        {/*<Route path={"/"} element={<SearchPage />} />*/}
      </Router>
    </>
  )
}

export default App
