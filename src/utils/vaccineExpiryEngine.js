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
  if (!dateStr) return new Date();
  
  // Clean string e.g. "Aug 2026", "August 2026", "Nov 18, 2026", "2026-08-31"
  const parts = dateStr.trim().toLowerCase().replace(/,/g, '').split(/\s+/);
  
  if (parts.length >= 2) {
    const monthKey = parts[0].slice(0, 3);
    const year = parseInt(parts[1], 10) || parseInt(parts[2], 10) || 2026;
    const monthIdx = monthMap[monthKey] !== undefined ? monthMap[monthKey] : 8;
    
    // Set to the end of that expiration month
    return new Date(year, monthIdx + 1, 0, 23, 59, 59);
  }
  
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function evaluateVaccineRecords(vaccinations = [], referenceDate = new Date('2026-09-09T19:40:00')) {
  const overdueList = [];
  const expiringSoonList = [];
  const validList = [];

  vaccinations.forEach((vax) => {
    const expiryDate = parseValidUntilDate(vax.validUntil);
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
