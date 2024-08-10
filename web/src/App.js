import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bread from './com/Bread'
import Cake from'./com/cake'
import Bun from './com/Bun'
import Cookie from './com/cookie'
import Croissant from './com/croissant'
import Sandwich from './com/sandwich'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Bread/>} />
        <Route path="/bun" element={<Bun/>} />
        <Route path="/cake" element={<Cake/>} />
        <Route path="/croissant" element={<Croissant/>} />
        <Route path="/cookie" element={<Cookie/>} />
        <Route path="/sandwich" element={<Sandwich/>} />

         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
