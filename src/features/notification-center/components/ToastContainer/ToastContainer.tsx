import styles from "./ToastContainer.module.scss";
import { useNotifications, useNotificationSettings } from "../../hooks";
import Toast from "../Toast/Toast";
import { ToastNotification } from "../../types/notification.types";
import { useEffect } from "react";

const ToastContainer = () => {
	const { list, dispatch } = useNotifications();
	const { settings } = useNotificationSettings();
	const toasts = list.filter((n) => n.type === "toast");

	const dismissEnd = (id: string) => {
		dispatch({ type: "DISMISS_ID", id, method: "hard" });
	};

	// If toast.id is foud in dismissed id's, do NOT return.
	const visibleToasts = toasts.filter((t) => !t.dismissed);

	useEffect(() => {}, [toasts]);

	// F-it. We ball.
	// Get the visible index fdor undismissed items, and the true index for dismissed items.
	const getNormalizedIndex = (toast: ToastNotification) => {
		const index = visibleToasts.findIndex((v) => v.id === toast.id);
		return index !== -1 ? index : toasts.findIndex((t) => t.id === toast.id);
	};

	return (
		<>
			<div className={styles["toast-container"]}>
				{toasts.map((t, i) => (
					<Toast
						key={t.id}
						toast={t}
						index={getNormalizedIndex(t)}
						dismissEnd={dismissEnd}
						autoDismiss={settings.autoDismiss && i === 0 ? true : false}
					/>
				))}
			</div>
		</>
	);
};

export default ToastContainer;
