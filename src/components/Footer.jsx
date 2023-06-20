import React, { useState } from 'react'
import Select from 'react-select';
import { themeOptions } from '../utils/themeOptions';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {

    const {theme, setTheme} = useTheme();

    const handleChange = (e) => {
        setTheme(e.value);
        localStorage.setItem('theme', JSON.stringify(e.value));
    }

    return (
        <div className='footer'>
            <div className='links'>
                Links
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
