import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Stafflogin from './pages/Stafflogin'
import Studentlogin from './pages/Studentlogin'
import Studentregister from './pages/Studentregister'
import Staffregister from './pages/Staffregister'
import Studentdash from './pages/Studentdash'
import Staffdash from './pages/Staffdash'


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/stafflogin' element={<Stafflogin/>}/>
      <Route path='/studentlogin' element={<Studentlogin/>}/>
      <Route path='/studentregister' element={<Studentregister/>}/>
      <Route path='/staffregister' element={<Staffregister/>}/>
      <Route path='/studentdash' element={<Studentdash/>}/>
      <Route path='/staffdash' element={<Staffdash/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
