import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import TrackCalories from './components/TrackCalories';
import SearchedHistory from './components/SearchedHistory';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/trackcalories' element={<TrackCalories/>}/>
          <Route path='/searchistory' element={<SearchedHistory/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
