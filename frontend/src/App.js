
import React from 'react'
import Registration from './Component/Registration';
import Login from './Component/Login';
import Chat from './Component/Chat';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
        <Route path='/' element={ <Chat/>}/>
        <Route path='/Login' element={ <Login/>}/>
        <Route path='/Register' element={<Registration/> }/>
        </Routes>

     </BrowserRouter>
    
    
    </>
  );
}

export default App;
