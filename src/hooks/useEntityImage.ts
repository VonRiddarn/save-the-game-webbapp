import { useEffect, useRef, useState } from "react";
import { Character, Company, Game, IGDBNamedEntity, IGDBNamedEntityEndpoint } from "@/services/igdb/types";
import { useIGDB } from "./useIGDB";

type IGDBImage = {
	image_id: string;
	height: number;
	width: number;
};

export const useEntityImage = (
	entity: IGDBNamedEntity,
	endpoint: IGDBNamedEntityEndpoint
): IGDBImage | null => {
	const { query } = useIGDB();
	const [image, setImage] = useState<IGDBImage | null>(null);
	const isMountedRef = useRef(true);

	useEffect(() => {
		isMountedRef.current = true;

		const fetchImage = async () => {
			let result: IGDBImage[] = [];

			switch (endpoint) {
				case "games":
					result = (await query(
						"covers",
						`fields image_id,height,width; where id = ${(entity as Game).cover};`
					)) as IGDBImage[];
					break;
				case "companies":
					result = (await query(
						"company_logos",
						`fields image_id,height,width; where id = ${(entity as Company).logo};`
					)) as IGDBImage[];
					break;
				case "characters":
					result = (await query(
						"character_mug_shots",
						`fields image_id,height,width; where id = ${(entity as Character).mug_shot};`
					)) as IGDBImage[];
					break;
			}

			if (isMountedRef.current && result.length > 0) {
				setImage(result[0]);
			}
		};

		fetchImage();

		return () => {
			isMountedRef.current = false;
		};
	}, [entity, endpoint, query]);

	return image;
};
