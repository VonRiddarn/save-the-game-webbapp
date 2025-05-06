"use client";

import { createContext } from "react";

export type HamburgerMenuContextType = {
	isOpen: boolean;
	toggleMenu: () => void;
	forceMenuState: (state: boolean) => void;
};

export const HamburgerMenuContext = createContext<HamburgerMenuContextType | null>(null);
