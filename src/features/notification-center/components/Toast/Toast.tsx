import CloseButton from "../CloseButton/CloseButton";
import styles from "./Toast.module.scss";
import { ToastNotification } from "../../types/notification.types";
import { DismissedToast } from "../ToastContainer/ToastContainer.types";
import { useEffect, useState } from "react";
import { useNotifications } from "../../hooks";

// TODO: Maybe add a dismiss status in the state instead...
// Reason: If we was to add a dismiss-all button we would have to use the clear from the reducer.
// In that case we won't be able to animate away the toasts!!! (damn it!!#"/UI")
// So yeah,
// TODO: Add toDismiss to state, or just add dismissed to state as is.

type ToastProps = {
	index: number;
	toast: ToastNotification;
	dismissEnd: (id: string) => void;
};

const Toast = ({ toast, index, dismissEnd }: ToastProps) => {
	const { dispatch } = useNotifications();

	const handleClose = () => {
		dispatch({ type: "DISMISS_ID", id: toast.id, method: "soft" });
		console.log(toast);
	};

	return (
		<section
			className={`${styles[`toast--${toast.severity}`]} ${
				toast.dismissed ? styles["toast--dismissed"] : ""
			}`}
			style={{ transform: `translateY(${-165 * index}px)` }}
			onAnimationEnd={() => {
				if (toast.dismissed) dismissEnd(toast.id);
			}}
		>
			<header>
				<div>⚠️ [{index}]</div>
				<h2>{toast.severity}</h2>
				<CloseButton onClick={handleClose} />
			</header>
			<div>
				<p>{toast.message}</p>
			</div>
			<div>
				<button>Retry</button>
				<button>View more</button>
			</div>
			<div className={styles["toast__progress-bar"]}>test</div>
		</section>
	);
};

export default Toast;
