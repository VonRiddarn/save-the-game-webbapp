"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopSearchBar from "../../components/DesktopSearchbar/DesktopSearchbar";
import { useEffect, useRef, useState } from "react";

// TODO: !! NOTE
// Note:
// This is where the API calls and data will live.
// The child components like desktop and mobile will just be vessels to visualize the data.
// This means that we can dynamically change the size of the viewport and keep the bar active when switching.

const Searchbar = () => {
	const [currentInput, setCurrentInput] = useState("");
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const isMobile = useIsMobile();

	// Debounce search
	const handleChange = (newValue: string) => {
		setCurrentInput(newValue);

		// We need to use newValue because  setCurrentInput is not updated until next render
		if (newValue.length < 2) return;

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			console.log("Timer expired, perform search for:", newValue);
			timerRef.current = null;
		}, 500);
	};

	// Cleanup if we unmount the component
	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	if (isMobile === null) return null;

	return isMobile ? (
		<h3>MOBILE DETECTED: {currentInput}</h3>
	) : (
		<DesktopSearchBar currentInput={currentInput} onChange={handleChange} entities={[]} />
	);
};

export default Searchbar;
