import styles from "./GameCompleteionForm.module.scss";
import { useCompletedGames } from "@/context/completedGamesContext";
import React, { useCallback, useEffect, useState } from "react";

type GameCompletionFormProps = {
	id: number;
};

const GameCompletionForm = ({ id }: GameCompletionFormProps) => {
	const [startDate, setStartDate] = useState<number | undefined>(undefined);
	const [endDate, setEndDate] = useState<number | undefined>(undefined);
	const [completed, setCompleted] = useState<boolean>(false);

	const { addCompletedGame, getGame } = useCompletedGames();

	const handleSave = () => {
		if (startDate && endDate && startDate > endDate) {
			alert("Start date cannot be after end date.");
			return;
		}

		const gameData = {
			id: id,
			startDate,
			endDate,
			completed,
		};

		addCompletedGame(gameData);
	};

	const resetValues = () => {
		const gameData = getGame(id);

		setStartDate(gameData?.startDate);
		setEndDate(gameData?.endDate);
		setCompleted(gameData?.completed || false);
	};

	const clearValues = () => {
		setStartDate(undefined);
		setEndDate(undefined);
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
				<p>Start Date</p>
				<input
					type="datetime-local"
					value={startDate ? new Date(startDate).toISOString().slice(0, -1) : ""}
					onChange={(e) =>
						setStartDate(e.target.value ? new Date(e.target.value).getTime() : undefined)
					}
				/>
			</span>
			<span>
				<p>End Date</p>
				<input
					type="datetime-local"
					value={endDate ? new Date(endDate).toISOString().slice(0, -1) : ""}
					onChange={(e) =>
						setEndDate(e.target.value ? new Date(e.target.value).getTime() : undefined)
					}
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
