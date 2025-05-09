import { IGDBNamedEntityReference } from "@/services/igdb/types";
import styles from "./MobileSearchBar.module.scss";

type MobileSearchbarProps = {
	currentInput: string;
	onChange: (value: string) => void;
	entities: IGDBNamedEntityReference[];
	dropdownActive: boolean;
	setDropdownActive: (value: boolean) => void;
};

const MobileSearchbar = ({
	entities,
	currentInput,
	onChange,
	dropdownActive,
	setDropdownActive,
}: MobileSearchbarProps) => {
	return (
		<div
			className={`${styles["mobile-searchbar"]} ${
				dropdownActive ? styles["mobile-searchbar--active"] : ""
			}`}
		>
			<form className={`${styles["mobile-searchbar__form"]}`}>
				<input type="search" />
			</form>
			<button
				className={`${styles["mobile-searchbar__button"]}`}
				onClick={() => setDropdownActive(true)}
			>
				Click to search
			</button>
			<div
				className={`${styles["mobile-searchbar__backdrop"]}`}
				style={{ pointerEvents: dropdownActive ? "auto" : "none" }}
				onClick={() => setDropdownActive(false)}
			></div>
		</div>
	);
};

export default MobileSearchbar;
