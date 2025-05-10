"use client";

import EntityList from "@/components/EntityList/EntityList";
import styles from "./DashBoardPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { useCompletedGames } from "@/context/completedGamesContext";
import { useFavoriteEntities } from "@/context/favoriteEntitiesContext";

const DashboardPage = () => {
	const { getAllEntities } = useFavoriteEntities();
	const { completedGames, getHoursSpent } = useCompletedGames();

	return (
		<main className={styles["main"]}>
			<Panel
				className={`${styles["panel"]} ${styles["panel-stats"]}`}
				header={{ title: "Your statistics", style: 2 }}
			>
				<div>
					<h3>Favorites ({getAllEntities().length})</h3>
					<span>
						<h4>Games: {getAllEntities("games").length}</h4>
						<h4>Studios: {getAllEntities("companies").length}</h4>
						<h4>Characters: {getAllEntities("characters").length}</h4>
					</span>
				</div>
				<div>
					<h3>Hours played: {getHoursSpent()}</h3>
					<h3>Games completed: {completedGames.length}</h3>
				</div>
			</Panel>
			<Panel className={`${styles["panel"]}`} header={{ title: "Completed games", style: 2 }}>
				<EntityList
					endpoint={"games"}
					query={`fields *; fields: id; where id = (${completedGames.map((c) => c.id).join(",")});`}
					cardLength="short"
				/>
			</Panel>
			<Panel className={`${styles["panel"]}`} header={{ title: "Favorite studios", style: 2 }}>
				<EntityList
					endpoint={"companies"}
					query={`fields *; fields: id; where id = (${getAllEntities("companies")
						.map((c) => c.id)
						.join(",")});`}
					cardLength="short"
				/>
			</Panel>
			<Panel className={`${styles["panel"]}`} header={{ title: "Favorite Games", style: 2 }}>
				<EntityList
					endpoint={"games"}
					query={`fields *; fields: id; where id = (${getAllEntities("games")
						.map((g) => g.id)
						.join(",")});`}
					cardLength="short"
				/>
			</Panel>
			<Panel className={`${styles["panel"]}`} header={{ title: "Favorite Characters", style: 2 }}>
				<EntityList
					endpoint={"characters"}
					query={`fields *; fields: id; where id = (${getAllEntities("characters")
						.map((c) => c.id)
						.join(",")});`}
					cardLength="short"
				/>
			</Panel>
		</main>
	);
};

export default DashboardPage;
