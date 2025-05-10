import { igdbQueryArray } from "@/services/igdb/query.utilities";
import React, { useEffect, useState } from "react";
import EntityCard from "../EntityCard/EntityCard";

type GameListProps = {
	query: string;
};

const GameList = ({ query }: GameListProps) => {
	const [ids, setIds] = useState<{ id: number }[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await igdbQueryArray<{ id: number }>("games", query);
				setIds(res);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, [query]);

	return (
		ids.length > 0 && (
			<ul>
				{ids.map((id) => (
					<li key={id.id}>
						<EntityCard id={id.id} endpoint={"games"} />
					</li>
				))}
			</ul>
		)
	);
};

export default GameList;
