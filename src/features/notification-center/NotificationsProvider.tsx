"use client";

import React, { useMemo, useReducer, useState } from "react";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import BannerContainer from "./components/BannerContainer/BannerContainer";
import { defaultSettings, notificationsReducer } from "./state";
import { NotificationSettings } from "./types/notification-settings.types";
import { NotificationsContext, NotificationSettingsContext } from "./context";

type NotificationsProviderProps = {
	children: React.ReactNode;
};

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
	const [list, dispatch] = useReducer(notificationsReducer, []);
	const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

	const notificationsValue = useMemo(() => ({ list, dispatch }), [list]);
	const settingsValue = useMemo(
		() => ({
			settings,
			setSettings,
		}),
		[settings]
	);

	return (
		<NotificationSettingsContext.Provider value={settingsValue}>
			<NotificationsContext.Provider value={notificationsValue}>
				<ToastContainer />
				<BannerContainer />
				{children}
			</NotificationsContext.Provider>
		</NotificationSettingsContext.Provider>
	);
};
