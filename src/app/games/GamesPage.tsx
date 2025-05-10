import styles from "./GamesPage.module.scss";
import EntityList from "@/components/EntityList/EntityList";
import Panel from "@/components/Panel/Panel";

const GamesPage = () => {
	return (
		<main>
			<Panel className={styles["panel-popular"]} header={{ title: "Popular", style: 1 }}>
				<EntityList
					endpoint={"games"}
					query={`fields *; limit 60; where rating >= 80; offset ${Math.floor(
						Math.random() * 1000
					)};`}
				/>
			</Panel>
		</main>
	);
};

export default GamesPage;
