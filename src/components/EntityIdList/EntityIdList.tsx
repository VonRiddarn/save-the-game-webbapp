"use client";

import styles from "./EntityIdList.module.scss";
import EntityCard from "../EntityCard/EntityCard";
import { IGDBMainEntityEndpoint } from "@/services/igdb/types";
import { CardLength } from "../EntityCard/types";

type EntityIdListProps = {
	endpoint: IGDBMainEntityEndpoint;
	ids: number[];
	cardLength?: CardLength;
};

const EntityIdList = ({ endpoint, ids, cardLength = "long" }: EntityIdListProps) => {
	return (
		ids.length > 0 && (
			<ul className={`${styles["entity-list"]}`}>
				{ids.map((id) => (
					<li key={id}>
						<EntityCard id={id} endpoint={endpoint} size={cardLength} />
					</li>
				))}
			</ul>
		)
	);
};

export default EntityIdList;
