import styles from "./ToastContainer.module.css";
import { v4 as uuidv4 } from "uuid";
import { useNotifications } from "../../hooks";

const ToastContainer = () => {
	const notificationCenter = useNotifications();
	const toasts = notificationCenter.notifications.filter((n) => n.type === "toast");

	return (
		<>
			<button
				onClick={() => {
					notificationCenter.dispatch({
						type: "PUSH",
						payload: {
							id: uuidv4(),
							message: "New toast message",
							type: "toast",
							variant: "info",
							duration: 5000,
						},
					});
				}}
			>
				Make a toast
			</button>
			<div className={styles["toast-container"]}>
				{toasts.map((t) => (
					<p key={t.id}>
						{t.id.substring(0, 5)}_____{t.message}
					</p>
				))}
			</div>
		</>
	);
};

export default ToastContainer;
