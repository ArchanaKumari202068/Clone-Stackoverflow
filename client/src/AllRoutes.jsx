import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import Userprofile from './pages/UserProfile/UserProfile'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path ='/Auth' element={<Auth/>}/>
        <Route path ='/Questions' element={<Questions />}/>
        <Route path ='/AskQuestion' element={<AskQuestion />}/>
        <Route path ='/Questions/:id' element={<DisplayQuestion />}/>
        <Route path= '/Tags' element={<Tags />} />
        <Route path= '/Users' element={<Users />} />
        <Route path= '/User/:id' element={<Userprofile />} />

    </Routes>
  )
}

export default AllRoutes