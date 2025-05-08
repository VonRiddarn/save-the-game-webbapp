import { IGDBNamedEntityReference } from "@/services/igdb/types";
import Link from "next/link";
import React from "react";
import { useEntityImage } from "@/hooks/useEntityImage";
import IGDBImage from "@/components/IGDBImage/IGDBImage";

type EntityDropdownCardProps = {
	entityRef: IGDBNamedEntityReference;
};

const EntityDropdownCard = ({ entityRef }: EntityDropdownCardProps) => {
	const { entity, endpoint } = entityRef;

	return (
		<Link href={`/${endpoint}/${entity.slug}`}>
			<IGDBImage entityRef={entityRef} />
			{entity.name}
		</Link>
	);
};

export default EntityDropdownCard;
