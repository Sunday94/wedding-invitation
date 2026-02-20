
/**
 * Utility to generate calendar event links and files
 */

export interface CalendarEvent {
    title: string;
    description: string;
    location: string;
    startTime: string; // ISO format
    endTime: string;   // ISO format
}

export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
    const fmtTime = (iso: string) => iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
    const start = fmtTime(event.startTime);
    const end = fmtTime(event.endTime);

    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.title);
    url.searchParams.append('dates', `${start}/${end}`);
    url.searchParams.append('details', event.description);
    url.searchParams.append('location', event.location);

    return url.toString();
};

export const generateOutlookUrl = (event: CalendarEvent): string => {
    const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
    url.searchParams.append('path', '/calendar/action/compose');
    url.searchParams.append('rru', 'addevent');
    url.searchParams.append('subject', event.title);
    url.searchParams.append('startdt', event.startTime);
    url.searchParams.append('enddt', event.endTime);
    url.searchParams.append('body', event.description);
    url.searchParams.append('location', event.location);

    return url.toString();
};

export const downloadIcsFile = (event: CalendarEvent) => {
    const fmtTime = (iso: string) => iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
    const start = fmtTime(event.startTime);
    const end = fmtTime(event.endTime);

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PROID:-//Wedding Designer//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${event.title}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
