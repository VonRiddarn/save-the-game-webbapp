import styles from "./ToastContainer.module.css";
import { useNotifications, useNotificationSettings } from "../../hooks";
import { useEffect } from "react";

const ToastContainer = () => {
	const { list, dispatch } = useNotifications();
	const { settings } = useNotificationSettings();
	const toasts = list.filter((n) => n.type === "toast");

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

	return (
		<>
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
