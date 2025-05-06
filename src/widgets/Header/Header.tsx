import HamburgerToggleButton from "@/features/HamburgerMenu/components/HamburgerToggleButton/HamburgerToggleButton";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles["header"]}>
			Header : Insert navigation and search bar here
			<br />
			<HamburgerToggleButton />
			<br />
		</header>
	);
};

export default Header;
