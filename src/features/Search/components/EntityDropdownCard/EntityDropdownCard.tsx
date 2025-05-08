import { Character, Company, Game, IGDBNamedEntityReference } from "@/services/igdb/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useEntityImage } from "@/hooks/useEntityImage";

type EntityDropdownCardProps = {
	entityRef: IGDBNamedEntityReference;
};

const EntityDropdownCard = ({ entityRef }: EntityDropdownCardProps) => {
	const { entity, endpoint } = entityRef;

	const image = useEntityImage(entity, endpoint);

	return (
		<Link href={`/${endpoint}/${entity.slug}`}>
			{image && (
				<img src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${image.image_id}.webp`} />
			)}
			{entity.name}
		</Link>
	);
};

export default EntityDropdownCard;
