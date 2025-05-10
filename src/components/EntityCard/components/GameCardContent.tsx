import { IGDBGame } from "@/services/igdb/types";
import React from "react";
import { CardLength } from "../types";
import Link from "next/link";

type GameCardContentProps = {
	entity: IGDBGame;
	size: CardLength;
	imgUrl: string;
};

const GameCardContent = ({ entity, size, imgUrl }: GameCardContentProps) => {
	const date = new Date(entity.first_release_date * 1000).getFullYear();
	const rating = (entity.total_rating / 10).toFixed(2);

	return (
		<>
			<img src={imgUrl} alt={`Image of ${entity.name}`} />
			<span>
				<span>
					<Link href={`/games/${entity.slug}`}>
						<h2>{entity.name}</h2>
						{!Number.isNaN(date) && <h3>({date})</h3>}
					</Link>
					{/* NO IDEA why I need to do a manual NaN check like this...*/}
					<p>⭐ {rating !== "NaN" ? rating : "?.??"}</p>
				</span>
				{size === "long" && <p>{entity.summary}</p>}
			</span>
		</>
	);
};

export default GameCardContent;
