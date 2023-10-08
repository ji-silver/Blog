'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface ImageContextType {
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
};

type ImageProviderProps = {
    children: ReactNode;
};

export const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within an ImageProvider');
    }
    return context;
};
export const ImageProvider = ({ children }: ImageProviderProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
            {children}
        </ImageContext.Provider>
    )
}