import CloseButton from "../CloseButton/CloseButton";
import styles from "./Toast.module.scss";
import { ToastNotification } from "../../types/notification.types";
import { DismissedToast } from "../ToastContainer/ToastContainer.types";

type ToastProps = {
	index: number;
	toast: ToastNotification;
	dismissBegin: (id: string, index: number) => void;
	dismissEnd: (id: string) => void;
	dismissedToasts: DismissedToast[];
};

const Toast = ({ toast, index, dismissBegin, dismissEnd, dismissedToasts }: ToastProps) => {
	const dismissStatus = dismissedToasts.find((t) => t.id === toast.id);
	const dismissed = dismissStatus !== undefined;

	const handleClose = () => {
		dismissBegin(toast.id, index);
	};

	return (
		<section
			className={`${styles[`toast--${toast.severity}`]} ${dismissed ? styles["toast--dismiss"] : ""}`}
			style={{ transform: `translateY(${-165 * (dismissed ? dismissStatus.index : index)}px)` }}
			onAnimationEnd={() => {
				if (dismissed) dismissEnd(toast.id);
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
