"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopSearchbar from "../../components/DesktopSearchbar/DesktopSearchbar";
import { useEffect, useRef, useState } from "react";
import { useIGDB } from "@/hooks/useIGDB";
import { IGDBNamedEntityReference } from "@/services/igdb/types";
import MobileSearchBar from "../../components/MobileSearchBar/MobileSearchBar";

const Searchbar = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [entities, setEntities] = useState<IGDBNamedEntityReference[]>([]);

	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const abortRef = useRef<AbortController | null>(null); // ← new

	const isMobile = useIsMobile();

	const games = useIGDB();
	const companies = useIGDB();
	const characters = useIGDB();

	// Debounce search
	const handleChange = (newValue: string) => {
		setCurrentInput(newValue);

		if (timerRef.current) clearTimeout(timerRef.current);
		if (abortRef.current) abortRef.current.abort();

		// We need to use newValue because  setCurrentInput is not updated until next render
		if (newValue.length < 2) {
			setEntities([]);
			return;
		}

		timerRef.current = setTimeout(async () => {
			setEntities([]);

			const controller = new AbortController();
			abortRef.current = controller;

			const [gameData, companyData, characterData] = await Promise.all([
				games.query("games", `fields *; search "${newValue}"; limit 5;`, controller.signal),
				companies.query(
					"companies",
					`fields *; where name ~ "${newValue}"*; limit 5;`,
					controller.signal
				),
				characters.query("characters", `fields *; search "${newValue}"; limit 5;`, controller.signal),
			]);

			// Don't update state if aborted
			if (controller.signal.aborted) return;

			setEntities([
				...(Array.isArray(gameData)
					? gameData.map((entity) => ({ entity, endpoint: "games" as const }))
					: []),
				...(Array.isArray(companyData)
					? companyData.map((entity) => ({ entity, endpoint: "companies" as const }))
					: []),
				...(Array.isArray(characterData)
					? characterData.map((entity) => ({ entity, endpoint: "characters" as const }))
					: []),
			]);

			timerRef.current = null;
		}, 500);
	};

	// Cleanup if we unmount the component
	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
			if (abortRef.current) abortRef.current.abort();
		};
	}, []);

	if (isMobile === null) return null;

	return isMobile ? (
		<MobileSearchBar />
	) : (
		<DesktopSearchbar currentInput={currentInput} onChange={handleChange} entities={entities} />
	);
};

export default Searchbar;
