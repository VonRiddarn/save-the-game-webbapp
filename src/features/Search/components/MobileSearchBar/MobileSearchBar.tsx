import styles from "./MobileSearchBar.module.scss";

const MobileSearchBar = () => {
	return (
		<div className={`${styles["mobile-searchbar"]}`}>
			<form className={`${styles["mobile-searchbar__form"]}`}>
				<input type="search" />
			</form>
			<button className={`${styles["mobile-searchbar__button"]}`}>Click to search</button>
			<div className={`${styles["mobile-searchbar__backdrop"]}`}></div>
		</div>
	);
};

export default MobileSearchBar;
