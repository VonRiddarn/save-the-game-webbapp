// TODO: Implement all this shit before my zen is lost and I forget wtf I'm doing.

export type NotificationSeverity = "info" | "success" | "warning" | "error";

export type NotificationType = "toast" | "banner";

export type NotificationItem = ToastNotification | BannerNotification;

export type NotificationAction = {
	label: string;
	onClick: () => void;
};

// We're making timestamps and serialize on the UI for less memory-bloat.
interface RootNotification {
	timestamp: number; // Date.now()
	id: string; // Used for rendering, internal deletion, keys and stuff like that
	tag?: string; // Logical identifier — used for grouping, deduplication, dismissing, etc...
	type: NotificationType;
	severity: NotificationSeverity;
	message: string;
	actions?: NotificationAction[];
	dismissed?: boolean; // TODO: Make it so that setting this to true will dismiss on next render
}

export type ToastNotification = RootNotification & {
	type: "toast";
	persist: boolean;
};

export type BannerNotification = RootNotification & {
	type: "banner";
	priority: number;
};
