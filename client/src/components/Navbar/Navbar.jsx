import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import logo from '../../assest/logo.png'
import search from '../../assest/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'

import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = () => {
    const dispatch =useDispatch()
    //retrieve the stored user profile data from 
    //localStorage using the localStorage.getItem method and then parse it using JSON.parse.
 
    // var User = JSON.parse(localStorage.getItem('Profile'))
    //replace the above line
    //using useSelector hook we can access the user to use data from anywhere to application
    var User = useSelector((state)=>(state.currentUserReducer))
    useEffect(()=>{
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))

    },[dispatch])


  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt='logo'/>
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type="text" placeholder='Search...'/>
                <img src={search} alt="search" width="18" className='search-icon'/>
            </form>
            { User === null ?
                <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
                <>
                    <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to='/'style={{color:'white', textDecoration:'none'}} >M</Link></Avatar>
                    <button className='nav-item nav-links'>Log out</button>
                </>
            }
        </div>
    </nav>
  )
}

export default Navbar