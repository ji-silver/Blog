import React from 'react'
import { CustomButtonProps } from '@/types'

const CustomButton = ({ title, containerStyles, textStyles, handleClick }: CustomButtonProps) => {
    return (
        <button className={`custom-btn ${containerStyles}`} onClick={handleClick}>
            <span className={`${textStyles}`}>{title}</span>
        </button>
    )
}

export default CustomButton
