import styles from "./GameCompleteionForm.module.scss";
import { useCompletedGames } from "@/context/completedGamesContext";
import React, { useEffect, useState } from "react";

type GameCompletionFormProps = {
	id: number;
};

const GameCompletionForm = ({ id }: GameCompletionFormProps) => {
	const [hours, setHours] = useState<number | undefined>(undefined);
	const [completed, setCompleted] = useState<boolean>(false);

	const { addCompletedGame, getGame } = useCompletedGames();

	const handleSave = () => {
		if (hours !== undefined && hours < 0) {
			alert("Hours cannot be negative.");
			return;
		}

		const gameData = {
			id: id,
			hours,
			completed,
		};

		addCompletedGame(gameData);
	};

	const resetValues = () => {
		const gameData = getGame(id);

		setHours(gameData?.hours);
		setCompleted(gameData?.completed || false);
	};

	const clearValues = () => {
		setHours(undefined);
		setCompleted(false);
	};

	useEffect(() => {
		resetValues();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form
			className={styles["game-completeion-form"]}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<span>
				<p>Hours Played</p>
				<input
					type="number"
					value={hours !== undefined ? hours : ""}
					onChange={(e) => setHours(e.target.value ? parseFloat(e.target.value) : undefined)}
				/>
			</span>
			<button onClick={() => setCompleted(!completed)}>Status: {completed ? "✔️" : "❌"}</button>
			<span>
				<button onClick={resetValues}>Reset</button>
				<button onClick={clearValues}>Clear</button>
				<button onClick={handleSave}>Save</button>
			</span>
		</form>
	);
};

export default GameCompletionForm;
