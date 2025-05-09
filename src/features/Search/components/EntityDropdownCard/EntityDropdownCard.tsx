import { IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import Link from "next/link";
import React from "react";

type EntityDropdownCardProps = {
	entityRef: IGDBMainEntityReferenceFull;
};

const EntityDropdownCard = ({ entityRef }: EntityDropdownCardProps) => {
	const { entity, endpoint } = entityRef;

	return <Link href={`/${endpoint}/${entity.slug}`}>{entity.name}</Link>;
};

export default EntityDropdownCard;
