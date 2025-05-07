"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopSearchBar from "../../components/DesktopSearchbar/DesktopSearchbar";
import { useEffect, useRef, useState } from "react";
import { IGDBEntityExplicit } from "@/services/igdb/types";
import { useIGDB } from "@/hooks/useIGDB";

const Searchbar = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [fetchedEntities, setFetchedEntities] = useState<IGDBEntityExplicit[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const isMobile = useIsMobile();

	// 3 different searches for easier semantics
	const games = useIGDB();
	const companies = useIGDB();
	const characters = useIGDB();

	// Debounce search
	const handleChange = (newValue: string) => {
		setCurrentInput(newValue);

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// We need to use newValue because  setCurrentInput is not updated until next render
		if (newValue.length < 2) {
			setFetchedEntities([]);
			return;
		}

		timerRef.current = setTimeout(async () => {
			setFetchedEntities([]);

			// This is fugly.
			// Normally I'd make one generic search to the /search api and typecheck the returns
			// but time restrictions makes this the "best" solution for now.
			const [gameData, companyData, characterData] = await Promise.all([
				games.query("games", `fields *; search "${newValue}"; limit 5;`),
				companies.query("companies", `fields *; where name ~ "${newValue}"*; limit 5;`),
				characters.query("characters", `fields *; search "${newValue}"; limit 5;`),
			]);

			const results = [
				...(Array.isArray(gameData) ? gameData : []),
				...(Array.isArray(companyData) ? companyData : []),
				...(Array.isArray(characterData) ? characterData : []),
			] as IGDBEntityExplicit[];

			setFetchedEntities(results);
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
		<DesktopSearchBar currentInput={currentInput} onChange={handleChange} entities={fetchedEntities} />
	);
};

export default Searchbar;
