import React from 'react'
import { CustomButtonProps } from '@/types'
import styles from './customButton.module.scss'

const CustomButton = ({ title, containerStyles, handleClick, icon, children, textStyles }: CustomButtonProps) => {
    return (
        <button className={`custom-btn ${containerStyles}`} onClick={handleClick}>
            {icon && (
                <div className={styles.button}>
                    {children}
                </div>
            )}
            <span className={`${textStyles}`}>{title}</span>
        </button>
    )
}

export default CustomButton
