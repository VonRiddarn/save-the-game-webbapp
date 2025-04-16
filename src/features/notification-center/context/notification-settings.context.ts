import { createContext } from "react";
import { NotificationSettings } from "../types/notification-settings.types";

export type NotificationSettingsContextType = {
	settings: NotificationSettings;
	setSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
};

export const NotificationSettingsContext = createContext<NotificationSettingsContextType | null>(null);
