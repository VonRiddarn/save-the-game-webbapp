"use client";
import styles from "./AppPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { getCachedEntitiesAsArray } from "@/services/igdb/visitedEntitiesCache";
import EntityCard from "@/components/EntityCard/EntityCard";
import EntityList from "@/components/EntityList/EntityList";

const AppPage = () => {
	const entities = getCachedEntitiesAsArray();
	return (
		<main>
			<div className={styles["content"]}>
				<Panel className={styles["panel-well-received"]} header={<h1>Well recieved</h1>}>
					<EntityList
						endpoint={"games"}
						query={`fields *; limit 10; where rating >= 80; offset ${Math.floor(
							Math.random() * 1000
						)};`}
					/>
				</Panel>
				<Panel className={styles["panel-well-received"]} header={<h1>Explore studios</h1>}>
					<EntityList
						endpoint={"companies"}
						query={`fields *; limit 10; where description != null; offset ${Math.floor(
							Math.random() * 5000
						)};`}
					/>
				</Panel>
				<Panel className={styles["panel-visited"]} header={<h1>Visited</h1>}>
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
