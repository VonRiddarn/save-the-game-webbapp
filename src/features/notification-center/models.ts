import { NotificationType, NotificationVariant } from "./types";

interface RootNotification {
	id: string; // Used for rendering, internal deleteion, keys and stuff like that
	tag?: string; // Logical identifier — used for grouping, deduplication, dismissing, etc...
	type: NotificationType;
	variant: NotificationVariant;
	message: string;
}

export interface ToastNotification extends RootNotification {
	type: "toast";
	duration: number;
}

export interface BannerNotification extends RootNotification {
	type: "banner";
	priority: number;
	action?: {
		label: string;
		onClick: () => void;
	};
}
