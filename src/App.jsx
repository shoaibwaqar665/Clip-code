import './App.css'
import Login from './components/Login';
import Clip from './components/Refactor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp';

function App() {

   return (
      <>
         {/* <Clip/> */}
         <Routes>
            <Route path="/" element={< Login />} />
            <Route path="/todo" element={< Clip />} />
            <Route path="/signup" element={< SignUp />} />
           
         </Routes>
      </>
   )
}

export default App
