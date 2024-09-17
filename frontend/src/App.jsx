import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import AdminHome from "./pages/AdminHome"
import ElectricianHome from "./pages/ElectricianHome"
function App() {
  

  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Home/>}>
             <Route path="/admin" element={<AdminHome/>}/>
             <Route path="/user"  element ={<ElectricianHome/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
       </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
