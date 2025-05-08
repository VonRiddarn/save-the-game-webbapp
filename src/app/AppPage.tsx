"use client";

import DGameList from "@/debug/DGameList";
import { getCachedEntitiesAsArray } from "@/services/igdb/visitedEntitiesCache";

const AppPage = () => {
	const entities = getCachedEntitiesAsArray();

	return (
		<main>
			<DGameList />
			<div>
				<h2>visited</h2>
				{entities.map((er) => {
					return (
						<p key={er.entity.id}>
							{er.endpoint} :: {er.entity.name}
						</p>
					);
				})}
			</div>
		</main>
	);
};

export default AppPage;
