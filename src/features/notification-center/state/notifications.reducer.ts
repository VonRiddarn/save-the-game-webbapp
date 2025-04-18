import { v4 as uuidv4 } from "uuid";
import { NotificationItem, NotificationSeverity, NotificationType } from "../types/notification.types";

export type NotificationAction =
	| { type: "PUSH"; payload: NotificationItem }
	| { type: "DISMISS_ID"; id: string; method: "hard" | "soft" }
	| { type: "DISMISS_TAG"; tag: string }
	| { type: "CLEAR_SEVERITY"; severity: NotificationSeverity }
	| { type: "CLEAR_TYPE"; notificationType: NotificationType }
	| { type: "CLEAR_ALL" };

export const notificationsReducer = (
	state: NotificationItem[],
	action: NotificationAction
): NotificationItem[] => {
	const at = action.type;

	switch (action.type) {
		case "PUSH":
			return [...state, action.payload];
		case "DISMISS_ID":
			return action.method == "hard"
				? state.filter((t) => t.id !== action.id)
				: state.map((t) => (t.id === action.id ? { ...t, dismissed: true } : t));
		case "DISMISS_TAG":
			return state.filter((n) => n.tag !== action.tag);
		case "CLEAR_SEVERITY":
			return state.filter((n) => n.severity !== action.severity);
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
					timestamp: Date.now(),
					id: uuidv4(),
					tag: TAG,
					type: "toast",
					severity: "error",
					message: `FATAL ERROR (${TAG}): "${at}" was not recognized as a valid action type! If you see this error, please make a report!`,
					persist: true,
				},
			];
	}
};
