
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import About from "../src/common/other/About"
import Contact from "./common/other/Contact" 
import HomePage from './common/other/HomePage';

function App() {

  const isAdminAuthenticated = () => {
    return true;
  };
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
           path="/" 
           element={
          isAdminAuthenticated() ? <HomePage /> : <Navigate to="/" />
        }
        />
          <Route
          path="/about"
          element={
            isAdminAuthenticated() ? <About /> : <Navigate to="/" />
          }
        />
        <Route
          path="/contact"
          element={
            isAdminAuthenticated() ? <Contact /> : <Navigate to="/" />
          }
        />
         
         <Route
          path="/feed"
          element={
            isAdminAuthenticated() ? <Contact /> : <Navigate to="/" />
          }
        />


       </Routes>
      </Router>
    </div>
  );
}

export default App;
