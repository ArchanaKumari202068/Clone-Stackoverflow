import React from 'react'
import { useLocation} from 'react-router-dom'
import './Users.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

const Users = () => {
    const location=useLocation()
    console.log(location)
  return (
    <div className='home-conatiner-1'>
        <LeftSidebar />
        <div className='home-container-2'>
            {
                location.pathname === '/Users'?
                <UsersList />:
                <></>

            }
        </div>

    </div>
  )
}

export default Users