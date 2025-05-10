import { igdbQueryArray } from "@/services/igdb/query.utilities";
import React, { useEffect, useState } from "react";
import EntityCard from "../EntityCard/EntityCard";
import { IGDBMainEntityEndpoint } from "@/services/igdb/types";
import { CardLength } from "../EntityCard/types";

type GameListProps = {
	endpoint: IGDBMainEntityEndpoint;
	query: string;
	cardLength?: CardLength;
};

const EntityList = ({ endpoint, query, cardLength = "long" }: GameListProps) => {
	const [ids, setIds] = useState<{ id: number }[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await igdbQueryArray<{ id: number }>(endpoint, query);
				setIds(res);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, [endpoint, query]);

	return (
		ids.length > 0 && (
			<ul>
				{ids.map((id) => (
					<li key={id.id}>
						<EntityCard id={id.id} endpoint={endpoint} size={cardLength} />
					</li>
				))}
			</ul>
		)
	);
};

export default EntityList;
