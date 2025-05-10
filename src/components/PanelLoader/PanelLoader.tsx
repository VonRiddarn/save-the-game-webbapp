import styles from "./PanelLoader.module.scss";

const PanelLoader = () => {
	return <div className={`${styles["panel-loader"]} loading`}></div>;
};

export default PanelLoader;
