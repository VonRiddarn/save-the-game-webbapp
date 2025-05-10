import styles from "./Panel.module.scss";

type HeaderStyle = 1 | 2 | 3 | 4 | 5 | 6;

type PanelProps = {
	header: { title: string; style: HeaderStyle };
	className?: string;
	children?: React.ReactNode;
};

const Panel = ({ header, className, children }: PanelProps) => {
	const cn = className ? className : "";

	return (
		<section className={`${styles["panel"]} ${cn}`}>
			<span className={styles["header"]}>{getHeader(header.title, header.style)}</span>
			<div>{children}</div>
		</section>
	);
};

const getHeader = (title: string, style: HeaderStyle) => {
	switch (style) {
		case 1:
			return <h1>{title}</h1>;
		case 2:
			return <h2>{title}</h2>;
		case 3:
			return <h3>{title}</h3>;
		case 4:
			return <h4>{title}</h4>;
		case 5:
			return <h5>{title}</h5>;
		case 6:
			return <h6>{title}</h6>;
		default:
			return <h6>{title}</h6>;
	}
};

export default Panel;
