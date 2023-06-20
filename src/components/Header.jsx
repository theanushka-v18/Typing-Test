import React from 'react'
import AccountCircle from './AccountCircle'
import AbcIcon from '@mui/icons-material/Abc';

const Header = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <AbcIcon style={{transform: 'scale(3)'}} />
            </div>
            <div className='user-icon'>
                <AccountCircle />
            </div>
        </div>
    )
}

export default Header
