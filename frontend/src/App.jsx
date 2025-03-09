import './App.css'
import SearchPage from "./Pages/SearchPage.jsx";
import DetailPage from "./Pages/DetailPage.jsx";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

function App() {
  return (
    <>
      <h1>OMDB project</h1>
      <Router>
          <Routes>
            <Route path={"/"} element={<SearchPage />} />
            <Route path={"/movies/:id"} element={<DetailPage />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
