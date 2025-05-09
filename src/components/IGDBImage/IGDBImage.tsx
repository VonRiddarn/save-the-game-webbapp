import { useEntityImage } from "@/hooks/useEntityImage";
import { IGDBMainEntityEndpoint, IGDBMainEntityReferenceFull } from "@/services/igdb/types";

type IGDBImageProps = {
	entityRef: IGDBMainEntityReferenceFull;
};

const IGDBImage = ({ entityRef }: IGDBImageProps) => {
	const { entity, endpoint } = entityRef;
	const image = useEntityImage(entity, endpoint);

	return image ? (
		<img src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${image.image_id}.webp`} />
	) : (
		<img src={getFallbackImage(endpoint)} />
	);
};

const getFallbackImage = (endpoint: IGDBMainEntityEndpoint): string => {
	switch (endpoint) {
		case "games":
			return "/images/icons/entities/icon-game-default.png";
		case "companies":
			return "/images/icons/entities/icon-company-default.png";
		case "characters":
			return "/images/icons/entities/icon-character-default.png";
	}
};

export default IGDBImage;
