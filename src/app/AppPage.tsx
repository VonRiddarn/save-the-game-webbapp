"use client";
import GameList from "@/components/GameList/GameList";
import styles from "./AppPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { getCachedEntitiesAsArray } from "@/services/igdb/visitedEntitiesCache";

const AppPage = () => {
	const entities = getCachedEntitiesAsArray();

	return (
		<main>
			<div className={styles["content"]}>
				<Panel className={styles["panel-popular"]} title={"Popular"}>
					<GameList query={"fields *; limit 10; where rating >= 80;"} />
				</Panel>
				<Panel className={styles["panel-visited"]} title={"Visited"}>
					{entities.map((er) => {
						return (
							<p key={er.entity.id}>
								{er.endpoint} :: {er.entity.name}
							</p>
						);
					})}
				</Panel>
			</div>
		</main>
	);
};

export default AppPage;
