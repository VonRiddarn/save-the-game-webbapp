"use client";

import Panel from "@/components/Panel/Panel";
import { getCachedEntitiesAsArray } from "@/services/igdb/visitedEntitiesCache";

const AppPage = () => {
	const entities = getCachedEntitiesAsArray();

	return (
		<main>
			<div>
				<Panel title={"Visited"}>
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
