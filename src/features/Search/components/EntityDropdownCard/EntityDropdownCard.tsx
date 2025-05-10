import styles from "./EntityDropdownCard.module.scss";
import { useEntityAvatar } from "@/hooks/useEntityImage";
import { IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import Link from "next/link";
import { useSearch } from "../../widgets/Searchbar/context/SearchContext";

type EntityDropdownCardProps = {
	entityRef: IGDBMainEntityReferenceFull;
};

const EntityDropdownCard = ({ entityRef }: EntityDropdownCardProps) => {
	const { entity, endpoint } = entityRef;
	const { imageUrl } = useEntityAvatar(entityRef, "small");

	const { setDropdownActive } = useSearch();

	return (
		<Link
			className={styles["entity-dropdown-card"]}
			href={`/${endpoint}/${entity.slug}`}
			onClick={() => {
				setDropdownActive(false);
			}}
		>
			{/*eslint-disable-next-line @next/next/no-img-element*/}
			<img src={imageUrl} alt={`Image of ${entity.name}`} />
			<p>{entity.name}</p>
		</Link>
	);
};

export default EntityDropdownCard;
