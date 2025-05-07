"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopSearchBar from "../../components/DesktopSearchbar/DesktopSearchbar";
import { useState } from "react";

// TODO: !! NOTE
// Note:
// This is where the API calls and data will live.
// The child components like desktop and mobile will just be vessels to visualize the data.
// This means that we can dynamically change the size of the viewport and keep the bar active when switching.

const Searchbar = () => {
	const [currentInput, setCurrentInput] = useState("");
	const isMobile = useIsMobile();

	const handleChange = (newValue: string) => setCurrentInput(newValue);

	if (isMobile === null) return null;

	return isMobile ? (
		<div>{currentInput}</div>
	) : (
		<DesktopSearchBar currentInput={currentInput} onChange={handleChange} entities={[]} />
	);
};

export default Searchbar;
