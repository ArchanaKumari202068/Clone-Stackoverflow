
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import  {fetchAllQuestions} from './actions/question'


function App() {

  const dispatch =useDispatch()
  //whenever our application i live useeFFect statement will run
  useEffect(()=>{
    dispatch(fetchAllQuestions())
  },[dispatch])


  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
      
    </div>
  );
}

export default App;
