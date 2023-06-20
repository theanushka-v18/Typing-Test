import React, { useState } from 'react'
import Select from 'react-select';
import { themeOptions } from '../utils/themeOptions';
import { useTheme } from '../context/ThemeContext';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {

    const {theme, setTheme} = useTheme();

    const handleChange = (e) => {
        setTheme(e.value);
        localStorage.setItem('theme', JSON.stringify(e.value));
    }

    return (
        <div className='footer'>
            <div className='links'>
                <div>
                    <a href='https://www.linkedin.com/in/theanushka-v18/' target='_blank'><LinkedInIcon /></a>
                </div>
                <div>
                    <a href='https://github.com/theanushka-v18' target='_blank'><GitHubIcon /></a>
                </div>
                <div>
                    <a href='https://twitter.com/theanushka_v18' target='_blank'><TwitterIcon /></a>
                </div>
            </div>
            <div className='themeButton'>
                <Select
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement='top'
                    defaultValue={{label: theme.label, value: theme}}
                    styles={
                        {
                            control: styles => ({...styles, backgroundColor: theme.backgroundColor}),
                            menu: styles => ({...styles, backgroundColor: theme.background}),
                            option: (styles, {isFocused}) => {
                                return {
                                    ...styles,
                                    backgroundColor: (!isFocused) ? theme.backgroundColor : theme.textColor,
                                    color: (!isFocused) ? theme.textColor : theme.backgroundColor,
                                    cursor: 'pointer'
                                }
                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

export default Footer
