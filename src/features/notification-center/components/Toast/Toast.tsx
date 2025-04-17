import CloseButton from "../CloseButton/CloseButton";
import styles from "./Toast.module.scss";
import { ToastNotification } from "../../types/notification.types";
import { useNotifications } from "../../hooks";

type ToastProps = {
	toast: ToastNotification;
};

const Toast = ({ toast }: ToastProps) => {
	const notifications = useNotifications();

	const handleClose = () => {
		notifications.dispatch({ type: "DISMISS_ID", id: toast.id });
	};

	return (
		<section className={styles["toast--success"]}>
			<header>
				<div>⚠️</div>
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
