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

	// TODO: Automatic search fill
	// Here we will later make a timer of like 0.5s that resets each time a new update is made.
	// When the timer runs out, make a request to the API and collect any and all entities that match.
	// This can be sent into the searchbar to get that sweet-sweet drop down
	const handleChange = (newValue: string) => setCurrentInput(newValue);

	if (isMobile === null) return null;

	return isMobile ? (
		<h3>MOBILE DETECTED: {currentInput}</h3>
	) : (
		<DesktopSearchBar currentInput={currentInput} onChange={handleChange} entities={[]} />
	);
};

export default Searchbar;
