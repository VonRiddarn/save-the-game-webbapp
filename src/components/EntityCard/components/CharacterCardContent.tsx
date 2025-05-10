import { IGDBCharacter } from "@/services/igdb/types";
import React from "react";
import { CardLength } from "../types";
import Link from "next/link";
import { getCharacterSpecies } from "@/services/igdb/local-lookup/character-species";

type CharacterCardContentProps = {
	entity: IGDBCharacter;
	size: CardLength;
	imgUrl: string;
};

const CharacterCardContent = ({ entity, size, imgUrl }: CharacterCardContentProps) => {
	return (
		<>
			<img src={imgUrl} alt={`Image of ${entity.name}`} />
			<span>
				<span>
					<Link href={`/characters/${entity.slug}`}>
						<h2>{entity.name}</h2>
						<p>{getCharacterSpecies(entity.character_species)}</p>
					</Link>
				</span>
				{size === "long" && <p>{entity.description}</p>}
			</span>
		</>
	);
};

export default CharacterCardContent;
