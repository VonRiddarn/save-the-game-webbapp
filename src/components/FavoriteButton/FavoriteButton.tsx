import { FavoriteEntity, useFavoriteEntities } from "@/context/favoriteEntitiesContext";
import React from "react";

type FavoriteButtonProps = {
	entity: FavoriteEntity;
};

const FavoriteButton = ({ entity }: FavoriteButtonProps) => {
	const { addEntity, removeEntity, isFavorite } = useFavoriteEntities();

	const favorite = isFavorite(entity);
	const icon = favorite ? "❤️" : "🖤";

	const handleClick = () => {
		if (favorite) {
			removeEntity(entity);
		} else {
			addEntity(entity);
		}
	};

	return <button onClick={handleClick}>{icon}</button>;
};

export default FavoriteButton;
