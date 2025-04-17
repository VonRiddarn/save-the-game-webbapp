import styles from "./ToastContainer.module.scss";
import { useNotifications, useNotificationSettings } from "../../hooks";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import { DismissedToast } from "./toast-container.types";

const ToastContainer = () => {
	const { list, dispatch } = useNotifications();
	const { settings } = useNotificationSettings();
	const toasts = list.filter((n) => n.type === "toast");

	const [dismissedToasts, setDismissedToasts] = useState<DismissedToast[]>([]);

	const dismissBegin = (id: string, index: number) => {
		setDismissedToasts((prev) => [...prev, { id, index }]);
	};

	const dismissEnd = (id: string) => {
		dispatch({ type: "DISMISS_ID", id });
		setDismissedToasts((prev) => prev.filter((dmt) => dmt.id !== id));
	};

	useEffect(() => {
		if (toasts.length <= 0 || !settings.autoDismiss) return;

		const timer = setTimeout(() => {
			const toast = toasts.find((t) => !t.persist);
			if (toast) {
				dispatch({ type: "DISMISS_ID", id: toast.id });
			}
		}, settings.dismissAfterMs);

		return () => clearTimeout(timer);
	}, [toasts, dispatch, settings]);

	// If toast.id is foud in dismissed id's, do NOT return.
	const visibleToasts = toasts.filter((t) => !dismissedToasts.find((d) => d.id === t.id));

	return (
		<>
			<div className={styles["toast-container"]}>
				{toasts.map((t) => (
					<Toast
						key={t.id}
						toast={t}
						index={visibleToasts.findIndex((v) => v.id === t.id)}
						dismissBegin={dismissBegin}
						dismissEnd={dismissEnd}
						dismissedToasts={dismissedToasts}
					/>
				))}
			</div>
		</>
	);
};

export default ToastContainer;
