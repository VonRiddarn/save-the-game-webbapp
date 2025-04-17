"use client";

import { useNotifications } from "@/features/notification-center";
import { v4 as uuidv4 } from "uuid";

const AppPage = () => {
	const notifications = useNotifications();

	return (
		<main>
			<button
				className="Look at this bro"
				onClick={() => {
					notifications.dispatch({
						type: "PUSH",
						payload: {
							timestamp: Date.now(),
							id: uuidv4(),
							message: "New toast message",
							type: "toast",
							severity: "info",
							persist: false,
						},
					});
				}}
			>
				Make a toast
			</button>
			<button
				className="Look at this bro"
				onClick={() => {
					notifications.dispatch({
						type: "PUSH",
						payload: {
							timestamp: Date.now(),
							id: uuidv4(),
							message: "FOOL! YOU CANNOT GET RID OF ME!!!",
							type: "toast",
							severity: "info",
							persist: true,
						},
					});
				}}
			>
				Make a PERSISTANT toast
			</button>
			<button
				className="Look at this bro"
				onClick={() => {
					notifications.dispatch({
						type: "CLEAR_ALL",
					});
				}}
			>
				Clear
			</button>
			<h1>App</h1>
		</main>
	);
};

export default AppPage;
