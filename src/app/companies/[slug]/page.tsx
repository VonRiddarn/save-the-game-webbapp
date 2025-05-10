import CompanyPage from "./CompanyPage";

type PageProps = {
	params: {
		slug: string;
	};
};

const CompanyPageWrapper = ({ params }: PageProps) => {
	return <CompanyPage slug={params.slug} />;
};

export default CompanyPageWrapper;
