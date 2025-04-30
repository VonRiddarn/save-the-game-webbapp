import CloseButton from "../CloseButton/CloseButton";
import styles from "./Toast.module.scss";
import { ToastNotification } from "../../types/notification.types";
import { useNotifications, useNotificationSettings } from "../../hooks";
import { useCallback, useEffect, useRef, useState } from "react";

type ToastProps = {
	index: number;
	toast: ToastNotification;
	autoDismiss: boolean;
	dismissEnd: (id: string) => void;
};

// TODO: Base height offset on actual element height
// TODO: Base progressBar width on time T / elapsed

const Toast = ({ toast, index, autoDismiss, dismissEnd }: ToastProps) => {
	const { dispatch } = useNotifications();
	const { settings } = useNotificationSettings();

	const [progress, setProgress] = useState(0);
	const animationFrameId = useRef<number | null>(null);
	const startTime = useRef<number | null>(null);

	const handleClose = useCallback(() => {
		dispatch({ type: "DISMISS_ID", id: toast.id, method: "soft" });
		console.log(toast);
	}, [dispatch, toast]);

	const updateProgess = (timestamp: number) => {
		if (!autoDismiss || toast.persist) return;

		if (startTime.current === null) startTime.current = timestamp;
		const elapsed = timestamp - startTime.current;

		const newProgress = Math.min((elapsed / settings.dismissAfterMs) * 100, 100);
		setProgress(newProgress);

		if (elapsed < settings.dismissAfterMs) {
			animationFrameId.current = requestAnimationFrame(updateProgess);
		} else {
			handleClose(); // Fire the event once loading is done
		}
	};

	useEffect(() => {
		animationFrameId.current = requestAnimationFrame(updateProgess);

		return () => {
			if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoDismiss]);

	return (
		<section
			className={`${styles[`toast--${toast.severity}`]} ${
				toast.dismissed ? styles["toast--dismissed"] : ""
			}`}
			style={
				{
					transform: `translateY(${-165 * index}px)`,
					"--progress": `${progress}%`,
				} as React.CSSProperties
			}
			onAnimationEnd={() => {
				if (toast.dismissed) dismissEnd(toast.id);
			}}
		>
			<header>
				<div>⚠️ [{index}]</div>
				<h2>{toast.severity}</h2>
				<CloseButton onClick={handleClose} />
			</header>
			<div className={styles["toast__content-wrapper"]}>
				<p>{toast.message}</p>
			</div>
			<div className={styles["toast__actions-wrapper"]}>
				{toast.actions?.map((a) => (
					<button
						className={`${styles[`toast__action`]} ${
							styles[`toast__action--${a.severity}`] ?? ""
						}`}
						onClick={a.onClick}
						key={a.label}
					>
						{a.label}
					</button>
				))}
			</div>
			<div className={styles["toast__progress-bar"]}>test</div>
		</section>
	);
};

export default Toast;
