// Format dates into YYYYMMDDTHHMMSSZ or use reasonable defaults
const pad = (n) => String(n).padStart(2, '0');

export const formatCalendarDate = (d) => {
  const date = d instanceof Date ? d : new Date(d || Date.now() + 86400000);
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
};

/**
 * Generates and downloads a real .ics (iCalendar) file
 * compatible with Apple Calendar, Google Calendar, Outlook, etc.
 */
export function downloadCalendarEvent({ title, description, location, startDate, endDate }) {
  const now = new Date();
  const start = formatCalendarDate(startDate);
  const end = formatCalendarDate(endDate || new Date((startDate instanceof Date ? startDate.getTime() : Date.now() + 86400000) + 3600000));
  const dtstamp = formatCalendarDate(now);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PawfectMatch//Pet Playmate & Health Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@pawfectmatch.app`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:🐾 ${title}`,
    `DESCRIPTION:${description ? description.replace(/\n/g, '\\n') : 'Scheduled via Pawfect Match App'}`,
    `LOCATION:${location || 'Dog Park'}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Upcoming Pet Playdate / Vet Visit',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates direct Google Calendar web event URL
 */
export function generateGoogleCalendarUrl({ title, description, location, startDate, endDate }) {
  const start = formatCalendarDate(startDate);
  const end = formatCalendarDate(endDate || new Date((startDate instanceof Date ? startDate.getTime() : Date.now() + 86400000) + 3600000));
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `🐾 ${title}`,
    details: `${description || 'Scheduled via Pawfect Match'}\n\nApp Link: https://pawfectmatch.app`,
    location: location || 'Dog Park',
    dates: `${start}/${end}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates direct Outlook.com / Office 365 web event URL
 */
export function generateOutlookCalendarUrl({ title, description, location, startDate, endDate }) {
  const start = (startDate instanceof Date ? startDate : new Date(Date.now() + 86400000)).toISOString();
  const end = (endDate instanceof Date ? endDate : new Date(Date.now() + 86400000 + 3600000)).toISOString();

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `🐾 ${title}`,
    body: `${description || 'Scheduled via Pawfect Match'}\n\nApp Link: https://pawfectmatch.app`,
    location: location || 'Dog Park',
    startdt: start,
    enddt: end
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generates a mailto: URL to send a calendar invite email to self or partner
 */
export function generateEmailInviteUrl({ recipientEmail = '', title, description, location, dateTime }) {
  const gcalUrl = generateGoogleCalendarUrl({ title, description, location });
  const subject = `🐾 Pawfect Match Playdate Invitation: ${title}`;
  const body = [
    `Hi there!`,
    ``,
    `You have an upcoming pet playdate invitation scheduled via Pawfect Match:`,
    ``,
    `📅 Event: ${title}`,
    `⏰ Date & Time: ${dateTime || 'Upcoming this week'}`,
    `📍 Location: ${location || 'Local Dog Park'}`,
    ``,
    `----------------------------------------`,
    `Click below to add directly to Google Calendar:`,
    `${gcalUrl}`,
    `----------------------------------------`,
    ``,
    `Looking forward to meeting you and having the pets play!`,
    `Sent with Pawfect Match 🐾`
  ].join('\n');

  return `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
