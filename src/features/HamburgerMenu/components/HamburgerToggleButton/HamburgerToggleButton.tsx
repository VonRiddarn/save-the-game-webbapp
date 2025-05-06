"use client";

import { useHamburgerMenu } from "../../hooks/useHamburgerMenu";

const HamburgerToggleButton = () => {
	const { isOpen, toggleMenu } = useHamburgerMenu();

	return <button onClick={toggleMenu}>Menu : {`${isOpen}`}</button>;
};

export default HamburgerToggleButton;
