import HamburgerToggleButton from "@/features/HamburgerMenu/components/HamburgerToggleButton/HamburgerToggleButton";
import styles from "./Header.module.scss";
import HamburgerNavigationMenu from "@/features/HamburgerMenu/components/HamburgerNavigationMenu/HamburgerNavigationMenu";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<HamburgerToggleButton />
			<HamburgerNavigationMenu />
		</header>
	);
};

export default Header;
