"use client";
import styles from "./AppPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { getCachedEntitiesAsArray } from "@/services/igdb/visitedEntitiesCache";
import EntityCard from "@/components/EntityCard/EntityCard";
import EntityQueryList from "@/components/EntityList/EntityList";

const AppPage = () => {
	const entities = getCachedEntitiesAsArray();
	return (
		<main>
			<div className={styles["content"]}>
				<Panel
					className={`${styles["panel"]} ${styles["panel-well-received"]}`}
					header={{ title: "Well received", style: 2 }}
				>
					<EntityQueryList
						endpoint={"games"}
						query={`fields *; limit 10; where rating >= 80; offset ${Math.floor(
							Math.random() * 1000
						)};`}
					/>
				</Panel>
				<Panel
					className={`${styles["panel"]} ${styles["panel-well-received"]}`}
					header={{ title: "Explore studios", style: 2 }}
				>
					<EntityQueryList
						endpoint={"companies"}
						query={`fields *; limit 30; where description != null & logo > -1 & developed > 0; offset ${Math.floor(
							Math.random() * 1000
						)};`}
					/>
				</Panel>
				<Panel
					className={`${styles["panel"]} ${styles["panel-visited"]}`}
					header={{ title: "Visited", style: 2 }}
				>
					{entities.map((er) => {
						return (
							<EntityCard
								key={er.entity.id}
								id={er.entity.id}
								endpoint={er.endpoint}
								size="short"
							/>
						);
					})}
				</Panel>
			</div>
		</main>
	);
};

export default AppPage;
