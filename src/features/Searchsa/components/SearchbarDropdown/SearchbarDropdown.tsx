import { IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import EntityDropdownCard from "../EntityDropdownCard/EntityDropdownCard";

type SearchbarDropdownProps = {
	className: string;
	entities: IGDBMainEntityReferenceFull[];
};

const SearchbarDropdown = ({ className, entities }: SearchbarDropdownProps) => {
	return (
		<div className={className}>
			<div>
				{entities.length > 0 &&
					entities.map(({ entity, endpoint }) => (
						<EntityDropdownCard
							key={entity.id}
							entityRef={{
								entity: entity,
								endpoint: endpoint,
							}}
						/>
					))}
			</div>
		</div>
	);
};

export default SearchbarDropdown;
