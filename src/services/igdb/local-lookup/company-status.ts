export const COMPANY_STATUS: Record<number, string> = {
	0: "active",
	1: "defunct",
	2: "merged",
	3: "renamed",
};

export const getCompanyStatus = (id: number): string => COMPANY_STATUS[id] ?? "Unknown";
