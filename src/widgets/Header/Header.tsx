import styles from "./Header.module.scss";
import Image from "next/image";
import HamburgerNavigationMenu from "@/features/HamburgerMenu/components/HamburgerNavigationMenu/HamburgerNavigationMenu";
import SearchBar from "@/features/Search/widgets/SearchBar/SearchBar";
import HamburgerButton from "@/features/HamburgerMenu/components/HamburgerButton/HamburgerButton";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<div className={styles["header__wrapper"]}>
				<Image src="/images/icons/icon.svg" alt="STG" width={64} height={45.5} />
				<SearchBar />
				<HamburgerButton />
			</div>
			<HamburgerNavigationMenu />
		</header>
	);
};

export default Header;
