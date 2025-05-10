import { useCallback, useEffect } from "react";
import styles from "./DesktopSearchbar.module.scss";
import { IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import SearchbarDropdown from "../SearchbarDropdown/SearchbarDropdown";
import { useSearch } from "../../widgets/Searchbar/context/SearchContext";

type DesktopSearchbarProps = {
	handleChange: (value: string) => void;
	handleSearch: (term: string) => void;
	entities: IGDBMainEntityReferenceFull[];
};

const DesktopSearchbar = ({ entities, handleSearch, handleChange }: DesktopSearchbarProps) => {
	const { currentInput, setCurrentInput, dropdownActive, setDropdownActive } = useSearch();

	const updateDropDown = useCallback(() => {
		setDropdownActive(entities.length > 0);
	}, [setDropdownActive, entities.length]);

	useEffect(() => {
		updateDropDown();
	}, [entities, updateDropDown]);

	return (
		<div
			className={`${styles["desktop-searchbar"]} ${
				dropdownActive ? styles["desktop-searchbar--active"] : ""
			}`}
			tabIndex={0}
			onFocus={() => updateDropDown()}
			onBlur={(event) => {
				const relatedTarget = event.relatedTarget as HTMLElement | null;
				const currentTarget = event.currentTarget as HTMLElement;

				if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
					setDropdownActive(false);
				}
			}}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSearch(currentInput);
					setDropdownActive(false);
				}}
			>
				<input
					type="search"
					value={currentInput}
					onChange={(event) => {
						handleChange(event.target.value);
						setCurrentInput(event.target.value);
					}}
					placeholder="Search for anything..."
				/>
				<button type="submit">
					<svg
						width="32px"
						height="32px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.03 12.53L13.03 15.53C12.88 15.68 12.69 15.75 12.5 15.75C12.31 15.75 12.12 15.68 11.97 15.53C11.68 15.24 11.68 14.76 11.97 14.47L13.69 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H13.69L11.97 9.53C11.68 9.24 11.68 8.76 11.97 8.47C12.26 8.18 12.74 8.18 13.03 8.47L16.03 11.47C16.32 11.76 16.32 12.24 16.03 12.53Z"
							fill="currentColor"
						/>
					</svg>
				</button>
				<SearchbarDropdown className={styles["desktop-searchbar__dropdown"]} entities={entities} />
			</form>
		</div>
	);
};

export default DesktopSearchbar;
