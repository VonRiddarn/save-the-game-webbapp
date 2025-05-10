"use client";
import PanelLoader from "@/components/PanelLoader/PanelLoader";
import styles from "./CompanyPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { useNotifications } from "@/features/notification-center";
import { useIGDB } from "@/services/hooks/useIGDB";
import { igdbGetImageLink, igdbQuerySingle } from "@/services/igdb/query.utilities";
import { IGDBCompany } from "@/services/igdb/types";
import { igdbDefaultImageFromEndPoint } from "@/services/igdb/utilities";
import { setCachedEntity } from "@/services/igdb/visitedEntitiesCache";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { getCountryName } from "@/services/igdb/local-lookup/country-codes";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";

type CompanyPageProps = {
	slug: string;
};

const CompanyPage = ({ slug }: CompanyPageProps) => {
	const { query, loading, error } = useIGDB<IGDBCompany[]>();
	const [company, setCompany] = useState<IGDBCompany | null>(null);

	const hasFiredRef = useRef(false);
	const ENDPOINT = "companies";

	const notifications = useNotifications();
	const router = useRouter();
	const [imgUrl, setImgUrl] = useState<string>(igdbDefaultImageFromEndPoint(ENDPOINT));

	useEffect(() => {
		const notificationID = uuid4();

		const fetchImage = async (entity: IGDBCompany) => {
			let imageUrl = igdbDefaultImageFromEndPoint(ENDPOINT); // Start with default image

			const res = await igdbQuerySingle<{ image_id: string }>(
				"logos",
				`fields *; where id = ${entity.logo};`
			);
			if (res?.image_id) {
				imageUrl = igdbGetImageLink("big", res.image_id);
			}

			setImgUrl(imageUrl); // Update the state with the found image or default
		};

		query(ENDPOINT, `fields *; where slug = "${slug}";`).then((data) => {
			if (hasFiredRef.current) return;
			if (data && data.length > 0) {
				setCompany(data[0]);
				fetchImage(data[0]);
				setCachedEntity(ENDPOINT, slug, data[0]);
			} else {
				notifications.dispatch({
					type: "PUSH",
					payload: {
						id: notificationID,
						message: `Couldn't find "${ENDPOINT}/${slug}". Redirecting...`,
						type: "toast",
						persist: true,
						timestamp: new Date().getTime(),
						severity: "error",
						actions: [
							{
								label: "Retry",
								severity: "primary",
								onClick: function (): void {
									router.push(`/${ENDPOINT}/${slug}`);
									notifications.dispatch({
										type: "DISMISS_ID",
										id: notificationID,
										method: "soft",
									});
								},
							},
							{
								label: "OK",
								severity: "secondary",
								onClick: function (): void {
									notifications.dispatch({
										type: "DISMISS_ID",
										id: notificationID,
										method: "soft",
									});
								},
							},
						],
					},
				});
				router.push("/search");
			}

			hasFiredRef.current = true;
		});
	}, [notifications, query, router, slug]);

	if (loading && !company) return <PanelLoader />;
	if (error) return <p>Error: {error}</p>;
	if (!company) return null;

	return (
		<div className={styles["wrapper"]}>
			<Panel className={styles["panel"]}>
				<div className={styles["content"]}>
					<FavoriteButton
						entity={{
							endpoint: ENDPOINT,
							id: company.id,
						}}
					/>
					<div className={styles["header"]}>
						<h1>
							{company.name} - {getCountryName(company.country)}
						</h1>
					</div>
					<img src={imgUrl} alt={`Logo of ${company.name}`} />
					<p>{company.description}</p>
				</div>
			</Panel>
			<Panel className={styles["panel"]}></Panel>
		</div>
	);
};

export default CompanyPage;
