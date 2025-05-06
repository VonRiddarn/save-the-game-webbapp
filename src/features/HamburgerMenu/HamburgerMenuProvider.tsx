"use client";

import { useState } from "react";
import { HamburgerMenuContext } from "./context/hamburger-menu.context";

type HamburgerMenuProviderProps = {
	children: React.ReactNode;
};

export const HamburgerMenuProvider = ({ children }: HamburgerMenuProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen((prev) => !prev);
	const forceMenuState = (state: boolean) => setIsOpen(state);

	return (
		<HamburgerMenuContext.Provider value={{ isOpen, toggleMenu, forceMenuState }}>
			{children}
		</HamburgerMenuContext.Provider>
	);
};
