// import logo from './logo.svg';   By default when react is installed

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* 
          <Route path="/users" element={<Users />} />
        */}
      </Routes>
    </Router>
  );
}


export default App;
