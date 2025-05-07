import styles from "./Header.module.scss";
import Image from "next/image";
import HamburgerNavigationMenu from "@/features/HamburgerMenu/components/HamburgerNavigationMenu/HamburgerNavigationMenu";
import SearchBar from "@/features/Search/components/SearchBar/SearchBar";
import HamburgerButton from "@/features/HamburgerMenu/components/HamburgerToggleButton/HamburgerToggleButton";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<Image src="/images/icons/icon.svg" alt="STG" width={64} height={45.5} />
			<SearchBar />
			<HamburgerButton />
			<HamburgerNavigationMenu />
		</header>
	);
};

export default Header;
