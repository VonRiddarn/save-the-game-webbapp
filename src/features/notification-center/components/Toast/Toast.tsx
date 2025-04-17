import styles from "./Toast.module.scss";

const Toast = () => {
	return (
		<section className={styles["toast"]}>
			<header>
				<div>⚠️</div>
				<h2>Toast header</h2>
				<button>X</button>
			</header>
			<div>
				<p>
					Toast body using <mark>cool</mark> <strong>stryling</strong>!
				</p>
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
