import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bread from './com/Bread'
import Suc from './com/suc'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Bread/>} />
          <Route path="/suc" element={<Suc/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
