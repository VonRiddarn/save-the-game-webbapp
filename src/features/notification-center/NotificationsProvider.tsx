"use client";

import React, { useMemo, useReducer } from "react";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import BannerContainer from "./components/BannerContainer/BannerContainer";
import { NotificationsContext } from "./NotificationsContext";
import { notificationsReducer } from "./reducer";

type NotificationsProviderProps = {
	children: React.ReactNode;
};

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
	const [notifications, dispatch] = useReducer(notificationsReducer, []);

	const value = useMemo(() => ({ notifications, dispatch }), [notifications]);

	return (
		<NotificationsContext.Provider value={value}>
			<ToastContainer />
			<BannerContainer />
			{children}
		</NotificationsContext.Provider>
	);
};
