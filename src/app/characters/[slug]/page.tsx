import CharacterPage from "./CharacterPage";

type PageProps = {
	params: {
		slug: string;
	};
};

const CharacterPageWrapper = ({ params }: PageProps) => {
	return <CharacterPage slug={params.slug} />;
};

export default CharacterPageWrapper;
