import { IGDBCompany } from "@/services/igdb/types";
import React from "react";
import { CardLength } from "../types";
import Link from "next/link";

type CompanyCardContentProps = {
	entity: IGDBCompany;
	size: CardLength;
	imgUrl: string;
};

const CompanyCardContent = ({ entity, size, imgUrl }: CompanyCardContentProps) => {
	const date = new Date(entity.created_at * 1000).getFullYear();
	return (
		<>
			<img src={imgUrl} alt={`Image of ${entity.name}`} />
			<span>
				<span>
					<Link href={`/games/${entity.slug}`}>
						<h2>{entity.name}</h2>
						{!Number.isNaN(date) && <h3>({date})</h3>}
					</Link>
				</span>
				{size === "long" && <p>{entity.description}</p>}
			</span>
		</>
	);
};

export default CompanyCardContent;
