"use client";

import { useCallback } from "react";
import { useHamburgerMenu } from "../../hooks/useHamburgerMenu";
import styles from "./HamburgerNavigationMenu.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const HamburgerNavigationMenu = () => {
	const { isOpen, forceMenuState } = useHamburgerMenu();
	const pathName = usePathname();

	const getLinkClass = useCallback(
		(path: string) => {
			const isActive = pathName === path;
			return `${styles["hamburger-navigation-menu__link"]} ${
				isActive ? styles["hamburger-navigation-menu__link--active"] : ""
			}`;
		},
		[pathName]
	);

	const forceClose = useCallback(() => forceMenuState(false), [forceMenuState]);

	return (
		<>
			<nav
				className={`noselect ${styles["hamburger-navigation-menu"]} ${
					styles[`hamburger-navigation-menu--${isOpen ? "open" : "closed"}`]
				}`}
			>
				<header className={styles["hamburger-navigation-menu__header"]}>
					<Image src="/images/icons/icon.svg" alt="STG" width={128} height={91} />
					<button onClick={forceClose}>X</button>
				</header>
				<section>
					<h2>Navigation</h2>
					<ul>
						<li>
							<Link className={getLinkClass("/")} href={"/"} onClick={forceClose}>
								Home
							</Link>
						</li>
						<li>
							<Link className={getLinkClass("/games")} href={"/games"} onClick={forceClose}>
								Games
							</Link>
						</li>
						<li>
							<Link
								className={getLinkClass("/companies")}
								href={"/companies"}
								onClick={forceClose}
							>
								Companies
							</Link>
						</li>
					</ul>
				</section>
				<section>
					<h2>Account</h2>
					<ul>
						<li>
							<Link
								className={getLinkClass("/dashboard")}
								href={"/dashboard"}
								onClick={forceClose}
							>
								Dashboard
							</Link>
						</li>
					</ul>
				</section>
				<section>
					<h2>Socials</h2>
					<ul>
						<li>Github</li>
						<li>Linkedin</li>
					</ul>
				</section>
			</nav>
			<div
				className={`${styles["hamburger-navigation-menu__background"]} ${
					isOpen && styles[`hamburger-navigation-menu__background--active`]
				}`}
				onClick={forceClose}
				style={{ pointerEvents: `${isOpen ? "auto" : "none"}` }}
			></div>
		</>
	);
};

export default HamburgerNavigationMenu;
