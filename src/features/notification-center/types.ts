// TODO: Implement all this shit before my zen is lost and I forget wtf I'm doing.

import { BannerNotification, ToastNotification } from "./models";

export type NotificationVariant = "info" | "success" | "warning" | "error";

export type NotificationType = "toast" | "banner";

export type NotificationItem = ToastNotification | BannerNotification;
