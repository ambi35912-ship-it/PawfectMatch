/**
 * Generates and downloads a real .ics (iCalendar) file
 * compatible with Apple Calendar, Google Calendar, Outlook, etc.
 */
export function downloadCalendarEvent({ title, description, location, startDate, endDate }) {
  // Format dates into YYYYMMDDTHHMMSSZ or use reasonable defaults
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  
  const formatDate = (d) => {
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };

  const start = startDate instanceof Date ? formatDate(startDate) : formatDate(new Date(Date.now() + 86400000));
  const end = endDate instanceof Date ? formatDate(endDate) : formatDate(new Date(Date.now() + 86400000 + 3600000));
  const dtstamp = formatDate(now);

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
