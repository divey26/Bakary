import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bread from './com/Bread'
import Cake from'./com/cake'
import Bun from './com/Bun'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Bread/>} />
        <Route path="/bun" element={<Bun/>} />
        <Route path="/cake" element={<Cake/>} />

         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
