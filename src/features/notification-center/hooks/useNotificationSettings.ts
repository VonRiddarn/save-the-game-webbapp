import { useContext } from "react";
import { NotificationSettingsContext } from "../context/notification-settings.context";

export const useNotificationSettings = () => {
	const ctx = useContext(NotificationSettingsContext);
	if (!ctx) {
		throw new Error("useNotifications must be used within NotificationsProvider!");
	}
	return ctx;
};
