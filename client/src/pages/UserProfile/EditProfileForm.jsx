import React from 'react'
import { useState } from 'react'

const EditProfileForm = ({currentUser,setSwitch}) => {
    const [name,setname] = useState(currentUser?.result?.name)
    const [about,setabout] = useState(currentUser?.result?.about)
    const [tags,setTags] = useState('')
  return (
    <div>
        <h1 className='edit-profile-title'>
            Edit Your profile
        </h1>
        <h2 className="edit-profile-title-2">
            Public information
        </h2>
        <form className="edit-profile-form">
            <label htmlFor="name">
                <h3>Display name</h3>
                <input type='text' value={name} onChange={(e) =>setname(e.target.value)}/>
            </label>
            <label htmlFor="about">
                <h3>About me</h3>
                <textarea id='about' cols='30' rows='10' value={about} onChange={(e) =>setabout(e.target.value)}></textarea>
            </label>
            <label htmlFor="tags">
                <h3>Watched tags</h3>
                <p>Add tags separated by 1 space</p>
                <input type="text"  id="tags" onChange={(e) =>setTags(e.target.value.split(''))}/>
            </label><br />
            <input type="submit" value="Save profile" className='user-submit-btn'/>
            <button type='button' className='user-cancel' onClick={() =>setSwitch(false)}>Cancel</button>

        </form>


    </div>
  )
}

export default EditProfileForm