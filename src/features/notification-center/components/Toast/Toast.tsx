import CloseButton from "../CloseButton/CloseButton";
import styles from "./Toast.module.scss";
import { ToastNotification } from "../../types/notification.types";
import { useNotifications } from "../../hooks";

type ToastProps = {
	index: number;
	toast: ToastNotification;
};

const Toast = ({ toast, index }: ToastProps) => {
	const notifications = useNotifications();

	const handleClose = () => {
		notifications.dispatch({ type: "DISMISS_ID", id: toast.id });
	};

	// TODO: Replace -150 with the height of the element after render (if possible)
	// Will probably have to do something like:
	// On render ->
	// Offset myself by: all(heightlist) + gap * N(heightList))
	// add my height to heightlist
	return (
		<section className={styles["toast--success"]} style={{ transform: `translateY(${-150 * index}px)` }}>
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
