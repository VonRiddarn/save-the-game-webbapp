import { useCallback, useEffect, useState } from "react";
import { SearchBarVesselProps } from "../../shared/types";
import styles from "./DesktopSearchbar.module.scss";

const DesktopSearchBar = (props: SearchBarVesselProps) => {
	const [dropdownActive, setDropdownActive] = useState(false);

	const updateDropDown = useCallback(() => {
		const hasAnyResults = Object.values(props.entities).some((arr) => arr.length > 0);
		setDropdownActive(hasAnyResults);
	}, [props.entities]);

	useEffect(() => {
		updateDropDown();
	}, [props.entities, updateDropDown]);

	return (
		<div
			className={`${styles["searchbar-desktop"]} ${
				dropdownActive && styles["searchbar-desktop--has-dropdown"]
			}`}
			tabIndex={0}
			onFocus={() => updateDropDown()}
			onBlur={() => setDropdownActive(false)}
		>
			<form>
				<input
					type="search"
					value={props.currentInput}
					onChange={(event) => {
						props.onChange(event.target.value);
					}}
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
				{dropdownActive && (
					<div className={styles["searchbar-desktop__dropdown"]}>
						{props.entities.games.length > 0 &&
							props.entities.games.map((game) => <div key={game.id}>{game.name}</div>)}

						{props.entities.companies.length > 0 &&
							props.entities.companies.map((company) => (
								<div key={company.id}>{company.name}</div>
							))}

						{props.entities.characters.length > 0 &&
							props.entities.characters.map((character) => (
								<div key={character.id}>{character.name}</div>
							))}
					</div>
				)}
			</form>
		</div>
	);
};

export default DesktopSearchBar;
