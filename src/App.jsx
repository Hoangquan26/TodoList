import { useState } from 'react'
import './App.css'
import HomePage from './component/HomePage/HomePage'
import StartPage from './component/StartPage/StartPage'
import { useSelector } from 'react-redux'
import { pageSelector } from './component/pageSlice'
function App() {
  const page = useSelector(pageSelector)
  switch(page) {
    case 'Home':
      return (
        <HomePage></HomePage>
      )
      break;
    case 'Start': 
      return (
        <StartPage></StartPage>
      )
      break;
    default:
      return(
        <HomePage></HomePage>
      )
  }
}

export default App
