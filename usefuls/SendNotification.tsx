import * as Notifications from 'expo-notifications';

export default async function SendNotification({title, body, data}: {title?: string; body?: string, data?: any}) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data,
        },
        trigger: null,
    });
};