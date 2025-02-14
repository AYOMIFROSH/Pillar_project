import React, { createContext, useContext, useState } from "react";

interface CsvRow {
    [key: string]: string;
}

interface CsvContextProps {
    data: CsvRow[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const CsvContext = createContext<CsvContextProps | undefined>(undefined);

export const CsvProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <CsvContext.Provider value={{ data, setData, loading, setLoading, error, setError }}>
            {children}
        </CsvContext.Provider>
    );
};

export const useCsvContext = () => {
    const context = useContext(CsvContext);
    if (!context) {
        throw new Error("useCsvContext must be used within a CsvProvider");
    }
    return context;
};
