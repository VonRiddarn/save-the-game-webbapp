import styles from "./Panel.module.scss";

type PanelProps = {
	title: string;
	className?: string;
	children?: React.ReactNode;
};

const Panel = ({ title, className, children }: PanelProps) => {
	const cn = className ? className : "";

	return (
		<section className={`${styles["panel"]} ${cn}`}>
			<h2>{title}</h2>
			<div>{children}</div>
		</section>
	);
};

export default Panel;
