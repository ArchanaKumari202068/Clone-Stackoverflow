import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import logo from '../../assest/logo.png'
import search from '../../assest/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import bars from '../../assest/bars-solid.svg'
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
// import bars from "../../assets/bars-solid.svg";

const Navbar = ({ handleSlideIn }) => {
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;








// import React, {useEffect} from 'react'
// import { Link } from 'react-router-dom'
// import { useSelector,useDispatch} from 'react-redux'
// import logo from '../../assest/logo.png'
// import search from '../../assest/search-solid.svg'
// import Avatar from '../../components/Avatar/Avatar'

// import './Navbar.css'
// import { setCurrentUser } from '../../actions/currentUser'

// const Navbar = () => {
//     const dispatch =useDispatch()
//     //retrieve the stored user profile data from 
//     //localStorage using the localStorage.getItem method and then parse it using JSON.parse.
 
//     // var User = JSON.parse(localStorage.getItem('Profile'))
//     //replace the above line
//     //using useSelector hook we can access the user to use data from anywhere to application
//     var User = useSelector((state)=>(state.currentUserReducer))
//     useEffect(()=>{
//         dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))

//     },[dispatch])


//   return (
//     <nav className='main-nav'>
//         <div className='navbar'>
//             <Link to='/' className='nav-item nav-logo'>
//                 <img src={logo} alt='logo'/>
//             </Link>
//             <Link to='/' className='nav-item nav-btn'>About</Link>
//             <Link to='/' className='nav-item nav-btn'>Products</Link>
//             <Link to='/' className='nav-item nav-btn'>For Teams</Link>
//             <form>
//                 <input type="text" placeholder='Search...'/>
//                 <img src={search} alt="search" width="18" className='search-icon'/>
//             </form>
//             { User === null ?
//                 <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
//                 <>
//                     <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to='/'style={{color:'white', textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
//                     {/* char is nothing bt locate a specific key ( name ) int that string */}
//                     <button className='nav-item nav-links'>Log out</button>
//                 </>
//             }
//         </div>
//     </nav>
//   )
// }

// export default Navbar