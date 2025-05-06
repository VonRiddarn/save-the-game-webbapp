import GamePage from "./GamePage";

type PageProps = {
	params: {
		slug: string;
	};
};

const GamesPage = ({ params }: PageProps) => {
	return <GamePage slug={params.slug} />;
};

export default GamesPage;
