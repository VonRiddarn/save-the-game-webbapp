export const COMPANY_STATUS: Record<number, string> = {
	0: "🟢 Active",
	1: "🔴 Defunct",
	2: "🟡 Merged",
	3: "🔵 Renamed",
};

export const getCompanyStatus = (id: number): string => COMPANY_STATUS[id] ?? "Unknown";
