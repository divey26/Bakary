import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import About from "./common/About"
import Contact from "./common/Contact" 
import HomePage from './common/HomePage';
import Login from "./common/Login" 
import Sign from "./common/Sign" 

import Bread from './Category/Bread/Bread';
import Croisant from './Category/Croisant';
import Cook from './Category/Cookies';
import Buns from './Category/Buns/Bun';
import Sandwich from './Category/Sandwich';
import Cakes from './Category/Cakes';



function App() {

  const isAdminAuthenticated = () => {
    return true;
  };
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
           path="/home" 
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
          path="/bread"
          element={
            isAdminAuthenticated() ? <Bread /> : <Navigate to="/" />
          }
        />
        <Route path='/croissants' element={<Croisant/>}/>
        <Route path='/cookies' element={<Cook/>}/>
        <Route path='/buns' element={<Buns/>}/>
        <Route path='/sandwiches' element={<Sandwich/>}/>
        <Route path='/cakes' element={<Cakes/>}/>

        <Route path='/' element={<Login/>}/>
        <Route path='/sign' element={<Sign/>}/>


       </Routes>
      </Router>
    </div>
  );
}

export default App;
