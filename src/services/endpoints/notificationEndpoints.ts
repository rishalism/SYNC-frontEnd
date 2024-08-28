const Base_url = `/api/notifications`

export enum NOTIFICATION_ENDPOINTS {
    SAVE_NOTIFICATION = `${Base_url}/notification/save`,
    GET_NOTIFICATIONS = `${Base_url}/notification`,
    CLEAR_ALL_NOTIFICATIONS = `${Base_url}/notifications/clear`,

}