import { useContext } from "react";
import { HamburgerMenuContextType, HamburgerMenuContext } from "../context/hamburger-menu.context";

export const useHamburgerMenu = (): HamburgerMenuContextType => {
	const ctx = useContext(HamburgerMenuContext);
	if (!ctx) {
		throw new Error("useHamburgerMenu must be used within a HamburgerToggleProvider");
	}
	return ctx;
};
