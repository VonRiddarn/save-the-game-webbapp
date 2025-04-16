"use client";

import React, { useMemo, useReducer } from "react";
import ToastContainer from "./components/Toast/ToastContainer";
import BannerContainer from "./components/Banner/BannerContainer";
import { NotificationItem, NotificationType, NotificationVariant } from "./types";
import { v4 as uuidv4 } from "uuid";
import { NotificationsContext } from "./NotificationsContext";

export type NotificationAction =
	| { type: "PUSH"; payload: NotificationItem }
	| { type: "DISMISS_ID"; id: string }
	| { type: "DISMISS_TAG"; tag: string }
	| { type: "CLEAR_VARIANT"; variant: NotificationVariant }
	| { type: "CLEAR_TYPE"; notificationType: NotificationType }
	| { type: "CLEAR_ALL" };

const notificationsReducer = (state: NotificationItem[], action: NotificationAction): NotificationItem[] => {
	const at = action.type;

	switch (action.type) {
		case "PUSH":
			return [...state, action.payload];
		case "DISMISS_ID":
			return state.filter((n) => n.id !== action.id);
		case "DISMISS_TAG":
			return state.filter((n) => n.tag !== action.tag);
		case "CLEAR_VARIANT":
			return state.filter((n) => n.variant !== action.variant);
		case "CLEAR_TYPE":
			return state.filter((n) => n.type !== action.notificationType);
		case "CLEAR_ALL":
			return [];
		// Make sure that we don't spam the user with the fallback if we are stuck in a loop.
		// We do this by filtering away this error tag each render before adding it to the state.
		// Is it performant? Nope, but we've already messed up by this point.
		default:
			const TAG = "NOTIFICATION_CENTER_UNRECOGNIZED_ACTION";
			return [
				...state.filter((n) => n.tag !== TAG),
				{
					id: uuidv4(),
					tag: TAG,
					type: "toast",
					variant: "error",
					message: `FATAL ERROR (${TAG}): "${at}" was not recognized as a valid action type! If you see this error, please make a report!`,
					duration: -1,
				},
			];
	}
};

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
