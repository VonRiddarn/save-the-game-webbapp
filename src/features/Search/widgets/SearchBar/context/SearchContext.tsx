import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
	currentInput: string;
	setCurrentInput: (val: string) => void;
	dropdownActive: boolean;
	setDropdownActive: (val: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
	const [currentInput, setCurrentInput] = useState("");
	const [dropdownActive, setDropdownActive] = useState(false);

	return (
		<SearchContext.Provider value={{ currentInput, setCurrentInput, dropdownActive, setDropdownActive }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => {
	const ctx = useContext(SearchContext);
	if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
	return ctx;
};
