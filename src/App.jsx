import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
{
  /* The following line can be included in your src/index.js or App.js file */
}

import Navbar from './Components/Navbar';
import Allroutes from './allroutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
  <Allroutes></Allroutes>
     
    </>
  )
}

export default App
