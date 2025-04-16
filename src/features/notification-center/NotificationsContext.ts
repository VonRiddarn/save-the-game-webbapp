import { createContext, Dispatch, useContext } from "react";
import { NotificationItem } from "./types";
import { NotificationAction } from "./reducer";

export type NotificationsContextType = {
	notifications: NotificationItem[];
	dispatch: Dispatch<NotificationAction>;
};

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => {
	const ctx = useContext(NotificationsContext);
	if (!ctx) {
		throw new Error("useNotifications must be used within NotificationsProvider!");
	}
	return ctx;
};
