import EntityList from "@/components/EntityList/EntityList";
import styles from "./CompaniesPage.module.scss";

import Panel from "@/components/Panel/Panel";

const CompaniesPage = () => {
	return (
		<main>
			<Panel className={styles["panel-popular"]} header={{ title: "Interesting studios", style: 1 }}>
				<EntityList
					endpoint={"companies"}
					query={`fields *; limit 30; where description != null & logo > -1 & developed > 0; offset ${Math.floor(
						Math.random() * 1000
					)};`}
				/>
			</Panel>
		</main>
	);
};

export default CompaniesPage;
