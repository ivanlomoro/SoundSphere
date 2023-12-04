import React, { createContext, ReactNode, useContext } from "react";

interface NewContextType {
};

const NewContext = createContext<NewContextType | null>(null);

type ProviderProps = {
    children: ReactNode;
};

const NewContextProvider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <NewContext.Provider value={{  }}>
            {children}
        </NewContext.Provider>
    );
};


export const useNewContext = () => {
    const context = useContext(NewContext);
    if (!context) {
        throw new Error("useNewContext must be used within an NewContextProvider");
    }
    return context;
};

export default NewContextProvider;
