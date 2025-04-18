import { v4 as uuidv4 } from "uuid";
import { NotificationItem, NotificationSeverity, NotificationType } from "../types/notification.types";

type DismissMethod = "hard" | "soft";

export type NotificationAction =
	| { type: "PUSH"; payload: NotificationItem }
	| { type: "DISMISS_ID"; id: string; method: DismissMethod }
	| { type: "DISMISS_TAG"; tag: string; method: DismissMethod }
	| { type: "DISMISS_SEVERITY"; severity: NotificationSeverity; method: DismissMethod }
	| { type: "DISMISS_TYPE"; notificationType: NotificationType; method: DismissMethod }
	| { type: "DISMISS_ALL"; method: DismissMethod };

// TODO: Add an "instances" prop for notificationItems.
// This way we can check if an identical item (excluding instances ofc) already exists
// If it does, just add to the instances instead of creating a new one.
// We can also have a setting for that: "groupMatching: boolean"

// TODO: Make a matchFn for this later to reduce boiler
/**
 * Compares the equality of 2 properties before returning a `NotificationItem`
 *
 * @param propA - Prop to compare, usually something like `tag`
 * @param propB - Prop to compare with, should be the same as `propA`
 * @param n - The `NotificationItem` to base the return of.
 * @returns `n` with the added prop `dismissed: true` or just `n`
 */
const getSoftItem = (propA: unknown, propB: unknown, n: NotificationItem): NotificationItem =>
	propA === propB ? { ...n, dismissed: true } : n;

export const notificationsReducer = (
	state: NotificationItem[],
	action: NotificationAction
): NotificationItem[] => {
	const at = action.type;

	switch (action.type) {
		case "PUSH":
			return [...state, action.payload];
		case "DISMISS_ID":
			return action.method === "hard"
				? state.filter((n) => n.id !== action.id)
				: state.map((n) => getSoftItem(n.id, action.id, n));
		case "DISMISS_TAG":
			return action.method === "hard"
				? state.filter((n) => n.tag !== action.tag)
				: state.map((n) => getSoftItem(n.tag, action.tag, n));
		case "DISMISS_SEVERITY":
			return action.method === "hard"
				? state.filter((n) => n.severity !== action.severity)
				: state.map((n) => getSoftItem(n.severity, action.severity, n));
		case "DISMISS_TYPE":
			return action.method === "hard"
				? state.filter((n) => n.type !== action.notificationType)
				: state.map((n) => getSoftItem(n.type, action.notificationType, n));
		case "DISMISS_ALL":
			return action.method === "hard" ? [] : state.map((n) => ({ ...n, dismissed: true }));
		default:
			const TAG = "NOTIFICATION_CENTER_UNRECOGNIZED_ACTION";
			return [
				...state,
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
