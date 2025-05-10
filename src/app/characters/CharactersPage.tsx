import EntityList from "@/components/EntityList/EntityList";
import styles from "./CharactersPage.module.scss";

import Panel from "@/components/Panel/Panel";

const CharactersPage = () => {
	return (
		<main>
			<Panel className={styles["panel-popular"]} header={{ title: "Interesting characters", style: 1 }}>
				<EntityList
					endpoint={"characters"}
					query={`fields *; limit 30; where description != null & mug_shot > -1; offset ${Math.floor(
						Math.random() * 600
					)};`}
				/>
			</Panel>
		</main>
	);
};

export default CharactersPage;
