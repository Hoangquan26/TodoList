import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './component/HomePage/HomePage'
import StartPage from './component/StartPage/StartPage'
import { useDispatch, useSelector } from 'react-redux'
import { pageSelector } from './component/pageSlice'
import { getCurrentUser } from './component/userSlice'
function App() {
  const page = useSelector(pageSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUser())
  },[])
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
