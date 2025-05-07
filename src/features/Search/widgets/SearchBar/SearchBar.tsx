"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopSearchBar from "../../components/DesktopSearchbar/DesktopSearchbar";
import { useEffect, useRef, useState } from "react";
import { useIGDB } from "@/hooks/useIGDB";
import { EntityCollection } from "../../shared/types";

const Searchbar = () => {
	const emptyCollection = {
		games: [],
		companies: [],
		characters: [],
	};

	const [currentInput, setCurrentInput] = useState("");
	const [entityCollection, setEntityCollection] = useState<EntityCollection>(emptyCollection);

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
			setEntityCollection(emptyCollection);
			return;
		}

		timerRef.current = setTimeout(async () => {
			setEntityCollection(emptyCollection);

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

			setEntityCollection({
				games: Array.isArray(gameData) ? gameData : [],
				companies: Array.isArray(companyData) ? companyData : [],
				characters: Array.isArray(characterData) ? characterData : [],
			});

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
		<h3>MOBILE DETECTED: {currentInput}</h3>
	) : (
		<DesktopSearchBar currentInput={currentInput} onChange={handleChange} entities={entityCollection} />
	);
};

export default Searchbar;
