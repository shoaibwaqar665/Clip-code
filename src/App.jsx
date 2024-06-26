import './App.css'
import Login from './components/Login';
import Clip from './components/Refactor';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

   return (
      <>
         <Routes>
            <Route path="/" element={< Login />} />
            <Route path="/todo" element={< Clip />} />
            <Route path="/signup" element={< SignUp />} />
           
         </Routes>
      </>
   )
}

export default App
