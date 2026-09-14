/**
 * Parses uploaded pet vaccination records and calculates exact expiration/overdue status
 * based on the uploaded validUntil dates.
 */

// Month string to index mapping
const monthMap = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

export function parseValidUntilDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;

  const value = dateStr.trim();
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch.map(Number);
    const parsed = new Date(year, month - 1, day, 23, 59, 59);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  
  // Clean string e.g. "Aug 2026", "August 2026", "Nov 18, 2026", "2026-08-31"
  const parts = value.toLowerCase().replace(/,/g, '').split(/\s+/);
  
  if (parts.length === 2 || parts.length === 3) {
    const monthKey = parts[0].slice(0, 3);
    const monthIdx = monthMap[monthKey];
    const year = Number(parts.at(-1));
    if (monthIdx !== undefined && Number.isInteger(year) && year >= 2000 && year <= 2200) {
      if (parts.length === 3) {
        const day = Number(parts[1]);
        if (!Number.isInteger(day) || day < 1 || day > 31) return null;
        return new Date(year, monthIdx, day, 23, 59, 59);
      }
      return new Date(year, monthIdx + 1, 0, 23, 59, 59);
    }
  }
  
  return null;
}

export function evaluateVaccineRecords(vaccinations = [], referenceDate = new Date()) {
  const overdueList = [];
  const expiringSoonList = [];
  const validList = [];

  vaccinations.forEach((vax) => {
    const expiryDate = parseValidUntilDate(vax.validUntil);
    if (!expiryDate) {
      overdueList.push({
        ...vax,
        expiryDate: null,
        diffDays: null,
        computedStatus: 'unknown',
        badgeText: 'Expiry date needs review',
        actionNote: 'Add a valid expiration date'
      });
      return;
    }
    const diffMs = expiryDate.getTime() - referenceDate.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const enriched = {
      ...vax,
      expiryDate,
      diffDays,
    };

    if (diffDays < 0) {
      enriched.computedStatus = 'overdue';
      enriched.overdueDays = Math.abs(diffDays);
      enriched.badgeText = `Overdue by ${Math.abs(diffDays)}d`;
      enriched.actionNote = `Expired ${vax.validUntil} based on uploaded passport`;
      overdueList.push(enriched);
    } else if (diffDays <= 90) {
      enriched.computedStatus = 'expiring_soon';
      enriched.daysRemaining = diffDays;
      enriched.badgeText = `Expires in ${diffDays}d`;
      enriched.actionNote = `Due for renewal by ${vax.validUntil}`;
      expiringSoonList.push(enriched);
    } else {
      enriched.computedStatus = 'valid';
      enriched.badgeText = `Valid until ${vax.validUntil}`;
      validList.push(enriched);
    }
  });

  return {
    overdueList,
    expiringSoonList,
    validList,
    hasOverdue: overdueList.length > 0,
    hasExpiringSoon: expiringSoonList.length > 0,
    totalRecords: vaccinations.length
  };
}
