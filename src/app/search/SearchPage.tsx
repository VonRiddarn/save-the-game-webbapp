"use client";
import styles from "./SearchPage.module.scss";
import EntityList from "@/components/EntityList/EntityList";
import Panel from "@/components/Panel/Panel";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
	const searchParams = useSearchParams();
	const queryParam = searchParams.get("q");

	console.log(queryParam);

	return (
		<main className={styles["main"]}>
			<Panel className={styles["panel-results"]} header={{ title: "Games", style: 1 }}>
				<EntityList endpoint={"games"} query={`fields *; search "${queryParam}"; limit 25;`} />
			</Panel>
			<Panel className={styles["panel-results"]} header={{ title: "Studios", style: 1 }}>
				<EntityList
					endpoint={"companies"}
					query={`fields *; where name ~ "${queryParam}"*; limit 25;`}
				/>
			</Panel>
			<Panel className={styles["panel-results"]} header={{ title: "Characters", style: 1 }}>
				<EntityList endpoint={"characters"} query={`fields *; search "${queryParam}"; limit 25;`} />
			</Panel>
		</main>
	);
};

export default SearchPage;
