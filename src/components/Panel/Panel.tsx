import styles from "./Panel.module.scss";

type PanelProps = {
	header: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
};

const Panel = ({ header, className, children }: PanelProps) => {
	const cn = className ? className : "";

	return (
		<section className={`${styles["panel"]} ${cn}`}>
			{header}
			<div>{children}</div>
		</section>
	);
};

export default Panel;
