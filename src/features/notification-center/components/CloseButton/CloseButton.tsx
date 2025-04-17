// Yeah... A whole component for this.
import styles from "./CloseButton.module.scss";

type CloseButtonProps = {
	onClick: () => void;
};

const CloseButton = ({ onClick }: CloseButtonProps) => {
	return (
		<button className={styles["close-button"]} onClick={onClick}>
			X
		</button>
	);
};

export default CloseButton;
