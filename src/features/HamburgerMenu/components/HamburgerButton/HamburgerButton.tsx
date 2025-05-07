"use client";

import styles from "./HamburgerButton.module.scss";
import { useHamburgerMenu } from "../../hooks/useHamburgerMenu";

const HamburgerButton = () => {
	const { isOpen, toggleMenu } = useHamburgerMenu();

	return (
		<button
			className={`${styles["hamburger-button"]} ${isOpen && styles["hamburger-button--active"]}`}
			onClick={toggleMenu}
		>
			<div
				className={`${styles["hamburger-button__line"]} ${styles["hamburger-button__line--top"]}`}
			></div>
			<div
				className={`${styles["hamburger-button__line"]} ${styles["hamburger-button__line--mid"]}`}
			></div>
			<div
				className={`${styles["hamburger-button__line"]} ${styles["hamburger-button__line--bot"]}`}
			></div>
		</button>
	);
};

export default HamburgerButton;
