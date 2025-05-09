import { IGDBNamedEntityReference } from "@/services/igdb/types";
import styles from "./MobileSearchBar.module.scss";
import SearchbarDropdown from "../SearchbarDropdown/SearchbarDropdown";
import { useSearch } from "../../widgets/Searchbar/context/SearchContext";
import { useRef } from "react";

type MobileSearchbarProps = {
	handleChange: (value: string) => void;
	handleSearch: (term: string) => void;
	entities: IGDBNamedEntityReference[];
};

const MobileSearchbar = ({ entities, handleSearch, handleChange }: MobileSearchbarProps) => {
	const { currentInput, setCurrentInput, dropdownActive, setDropdownActive } = useSearch();

	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<div
			className={`${styles["mobile-searchbar"]} ${
				dropdownActive ? styles["mobile-searchbar--active"] : ""
			}`}
		>
			<form
				className={`${styles["mobile-searchbar__form"]}`}
				onSubmit={(e) => {
					e.preventDefault();
					handleSearch(currentInput);
				}}
			>
				<input
					ref={inputRef}
					type="search"
					value={currentInput}
					onChange={(event) => {
						handleChange(event.target.value);
						setCurrentInput(event.target.value);
					}}
				/>
			</form>
			<SearchbarDropdown
				className={`${styles["mobile-searchbar__dropdown"]} ${
					entities.length <= 0 ? styles["mobile-searchbar__dropdown--empty"] : ""
				}`}
				entities={entities}
			/>
			<button
				className={`${styles["mobile-searchbar__button"]}`}
				onClick={() => {
					setDropdownActive(true);
					inputRef.current?.focus();
				}}
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
