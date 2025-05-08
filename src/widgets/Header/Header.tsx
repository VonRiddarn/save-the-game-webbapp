import styles from "./Header.module.scss";
import Image from "next/image";
import HamburgerNavigationMenu from "@/features/HamburgerMenu/components/HamburgerNavigationMenu/HamburgerNavigationMenu";
import HamburgerButton from "@/features/HamburgerMenu/components/HamburgerButton/HamburgerButton";
import Searchbar from "@/features/Search/widgets/Searchbar/Searchbar";
import Link from "next/link";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<div className={styles["header__wrapper"]}>
				<Link href={"/"}>
					<Image src="/images/icons/logo/logo-default.svg" alt="STG" width={64} height={45.5} />
				</Link>
				<Searchbar />
				<HamburgerButton />
			</div>
			<HamburgerNavigationMenu />
		</header>
	);
};

export default Header;
