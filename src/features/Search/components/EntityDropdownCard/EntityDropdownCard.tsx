import styles from "./EntityDropdownCard.module.scss";
import { IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import Link from "next/link";
import { useSearch } from "../../widgets/Searchbar/context/SearchContext";
import { igdbDefaultImageFromEndPoint } from "@/services/igdb/utilities";
import { useEffect, useState } from "react";
import { igdbGetImageLink, igdbQuerySingle } from "@/services/igdb/query.utilities";

type EntityDropdownCardProps = {
	entityRef: IGDBMainEntityReferenceFull;
};

const EntityDropdownCard = ({ entityRef }: EntityDropdownCardProps) => {
	const { entity, endpoint } = entityRef;
	const [imgUrl, setImgUrl] = useState(igdbDefaultImageFromEndPoint(entityRef.endpoint));

	const { setDropdownActive } = useSearch();

	useEffect(() => {
		const fetchImage = async () => {
			if (!entity) return;

			if ("cover" in entity) {
				const res = await igdbQuerySingle<{ image_id: string }>(
					"covers",
					`fields *; where id = ${entity.cover};`
				);
				if (res?.image_id) setImgUrl(igdbGetImageLink("big", res.image_id));
			}
			if ("logo" in entity) {
				const res = await igdbQuerySingle<{ image_id: string }>(
					"company_logos",
					`fields *; where id = ${entity.logo};`
				);
				if (res?.image_id) setImgUrl(igdbGetImageLink("big", res.image_id));
			}
			if ("mug_shot" in entity) {
				const res = await igdbQuerySingle<{ image_id: string }>(
					"character_mug_shots",
					`fields *; where id = ${entity.mug_shot};`
				);
				if (res?.image_id) setImgUrl(igdbGetImageLink("big", res.image_id));
			}
		};

		fetchImage();
	}, [endpoint, entity]);

	return (
		<Link
			className={styles["entity-dropdown-card"]}
			href={`/${endpoint}/${entity.slug}`}
			onClick={() => {
				setDropdownActive(false);
			}}
		>
			{/*eslint-disable-next-line @next/next/no-img-element*/}
			<img src={imgUrl} alt={`Image of ${entity.name}`} />
			<p>{entity.name}</p>
		</Link>
	);
};

export default EntityDropdownCard;
