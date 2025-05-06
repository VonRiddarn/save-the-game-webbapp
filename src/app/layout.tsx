import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import { NotificationsProvider } from "@/features/notification-center/NotificationsProvider";
import { HamburgerMenuProvider } from "@/features/HamburgerMenu/HamburgerMenuProvider";
import Header from "@/widgets/Header/Header";
import HamburgerNavigationMenu from "@/features/HamburgerMenu/components/HamburgerNavigationMenu/HamburgerNavigationMenu";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Save the game",
	description: "Save the game is the one and only game tracker site you need!",
};

type RootLayoutProps = Readonly<{
	children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<NotificationsProvider>
					<HamburgerMenuProvider>
						<Header />
						<HamburgerNavigationMenu />
						<div className="routed-page-wrapper">{children}</div>
					</HamburgerMenuProvider>
				</NotificationsProvider>
			</body>
		</html>
	);
};

export default RootLayout;
