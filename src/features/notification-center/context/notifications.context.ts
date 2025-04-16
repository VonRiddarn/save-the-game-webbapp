import { createContext, Dispatch } from "react";
import { NotificationItem } from "../types/notification.types";
import { NotificationAction } from "../state/notifications.reducer";

export type NotificationsContextType = {
	list: NotificationItem[];
	dispatch: Dispatch<NotificationAction>;
};

export const NotificationsContext = createContext<NotificationsContextType | null>(null);
