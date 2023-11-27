import React, { createContext, ReactNode, useContext } from "react";




interface CloudinaryContextType {
   
}

const CloudinaryContext = createContext<CloudinaryContextType | null>(null);
const cloudinaryUrl = process.env.CLOUDINARY_URL;

type ProviderProps = {
    children: ReactNode;
}

const CloudinaryContextProvider: React.FC<ProviderProps> = ({ children }) => {
   

    return (
        <CloudinaryContext.Provider value={{  }}>
            {children}
        </CloudinaryContext.Provider>
    );
};

// Custom Hook to use API Calls
export const useCloudinaryContext = () => {
    const context = useContext(CloudinaryContext);
    if (!context) {
        throw new Error("useCloudinaryContext must be used within an CloudinaryContextProvider");
    }
    return context;
};

export default CloudinaryContextProvider;
