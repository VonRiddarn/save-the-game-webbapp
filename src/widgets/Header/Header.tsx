import HamburgerToggleButton from "@/features/HamburgerMenu/components/HamburgerToggleButton/HamburgerToggleButton";
import styles from "./Header.module.scss";
import HamburgerNavigationMenu from "@/features/HamburgerMenu/components/HamburgerNavigationMenu/HamburgerNavigationMenu";
import Image from "next/image";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<Image src="/images/icons/icon.svg" alt="STG" width={64} height={45.5} />
			<HamburgerToggleButton />
			<HamburgerNavigationMenu />
		</header>
	);
};

export default Header;
