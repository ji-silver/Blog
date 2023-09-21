import React from 'react'
import { CustomButtonProps } from '@/types'
import styles from 'customButton.module.scss'

const CustomButton = ({ title, Styles, handleClick }: CustomButtonProps) => {
    return (
        <button className={`custom-btn ${Styles}`} onClick={handleClick}>
            <span>{title}</span>
        </button>
    )
}

export default CustomButton
