import styles from "./ToastContainer.module.scss";
import { useNotifications, useNotificationSettings } from "../../hooks";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import { DismissedToast } from "./ToastContainer.types";

// An alternative solution to this whole problem would be to have a dismissedToasts container.
// This would be wickety wack, but it would be less convoluted code - just move from one container to the other.

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
				dismissBegin(
					toast.id,
					toasts.findIndex((t) => t.id === toast.id)
				);
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
