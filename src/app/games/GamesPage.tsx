import styles from "./GamesPage.module.scss";
import EntityQueryList from "@/components/EntityQueryList/EntityList";
import Panel from "@/components/Panel/Panel";

const GamesPage = () => {
	return (
		<main>
			<Panel className={styles["panel-popular"]} header={{ title: "World class games", style: 1 }}>
				<EntityQueryList
					endpoint={"games"}
					query={`fields *; limit 30; where rating >= 90; offset ${Math.floor(
						Math.random() * 1000
					)};`}
				/>
			</Panel>
		</main>
	);
};

export default GamesPage;
