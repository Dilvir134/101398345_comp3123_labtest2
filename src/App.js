import './App.css';
import Weather from "./pages/weather";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import SearchBar from "./components/searchbar";
import {useState} from "react";

function App() {
    const [search, setSearch] = useState("");

  return(
      <Router>
          <SearchBar search = {search} setSearch={setSearch} />
        <Routes>
          <Route exact path="/" element={<Weather city={search} />} />
        </Routes>
      </Router>
  );
}

export default App;
