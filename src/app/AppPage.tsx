"use client";

import { useNotifications } from "@/features/notification-center";
import { NotificationSeverity } from "@/features/notification-center/types/notification.types";
import { v4 as uuidv4 } from "uuid";

const AppPage = () => {
	const notifications = useNotifications();

	const getRandomSeverity = () => {
		const severities: NotificationSeverity[] = ["info", "success", "warning", "error"];
		const randomIndex = Math.floor(Math.random() * severities.length);
		return severities[randomIndex];
	};

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
							severity: getRandomSeverity(),
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
							severity: getRandomSeverity(),
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
						type: "DISMISS_ALL",
						method: "soft",
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
