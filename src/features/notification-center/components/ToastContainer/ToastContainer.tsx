import styles from "./ToastContainer.module.scss";
import { useNotifications, useNotificationSettings } from "../../hooks";
import { useEffect } from "react";
import Toast from "../Toast/Toast";
import { ToastNotification } from "../../types/notification.types";

const ToastContainer = () => {
	const { list, dispatch } = useNotifications();
	const { settings } = useNotificationSettings();
	const toasts = list.filter((n) => n.type === "toast");

	const dismissEnd = (id: string) => {
		dispatch({ type: "DISMISS_ID", id, method: "hard" });
	};

	useEffect(() => {
		if (toasts.length <= 0 || !settings.autoDismiss) return;

		const timer = setTimeout(() => {
			const toast = toasts.find((t) => !t.persist);
			if (toast) dispatch({ type: "DISMISS_ID", id: toast.id, method: "soft" });
		}, settings.dismissAfterMs);

		return () => clearTimeout(timer);
	}, [toasts, dispatch, settings]);

	// If toast.id is foud in dismissed id's, do NOT return.
	const visibleToasts = toasts.filter((t) => !t.dismissed);

	// F-it. We ball.
	// Get the visible index fdor undismissed items, and the true index for dismissed items.
	const getNormalizedIndex = (toast: ToastNotification) => {
		const index = visibleToasts.findIndex((v) => v.id === toast.id);
		return index !== -1 ? index : toasts.findIndex((t) => t.id === toast.id);
	};

	return (
		<>
			<div className={styles["toast-container"]}>
				{toasts.map((t) => (
					<Toast key={t.id} toast={t} index={getNormalizedIndex(t)} dismissEnd={dismissEnd} />
				))}
			</div>
		</>
	);
};

export default ToastContainer;
