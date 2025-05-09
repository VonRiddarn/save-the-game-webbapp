"use client";
import styles from "./AppPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { getCachedEntitiesAsArray } from "@/services/igdb/visitedEntitiesCache";

const AppPage = () => {
	const entities = getCachedEntitiesAsArray();

	return (
		<main>
			<div className={styles["content"]}>
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
