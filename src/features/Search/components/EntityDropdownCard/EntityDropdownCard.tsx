import { useEntityAvatar } from "@/hooks/useEntityImage";
import { IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import Link from "next/link";

type EntityDropdownCardProps = {
	entityRef: IGDBMainEntityReferenceFull;
};

const EntityDropdownCard = ({ entityRef }: EntityDropdownCardProps) => {
	const { entity, endpoint } = entityRef;
	const { imageUrl } = useEntityAvatar(entityRef, "small");

	return (
		<Link href={`/${endpoint}/${entity.slug}`}>
			{/*eslint-disable-next-line @next/next/no-img-element*/}
			<img src={imageUrl} alt={`Image of ${entity.name}`} />
			{entity.name}
		</Link>
	);
};

export default EntityDropdownCard;
