// TODO: Implement all this shit before my zen is lost and I forget wtf I'm doing.

export type NotificationVariant = "info" | "success" | "warning" | "error";

export type NotificationType = "toast" | "banner";

export type NotificationItem = ToastNotification | BannerNotification;

interface RootNotification {
	id: string; // Used for rendering, internal deleteion, keys and stuff like that
	tag?: string; // Logical identifier — used for grouping, deduplication, dismissing, etc...
	type: NotificationType;
	variant: NotificationVariant;
	message: string;
}

export type ToastNotification = RootNotification & {
	type: "toast";
	duration: number;
};

export type BannerNotification = RootNotification & {
	type: "banner";
	priority: number;
	action?: {
		label: string;
		onClick: () => void;
	};
};
