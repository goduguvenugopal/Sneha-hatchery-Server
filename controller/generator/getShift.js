// get shift function based on current time

function getShift(date = new Date()) {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const totalMinutes = hours * 60 + minutes; // 0 .. 1439

  const A_start = 9 * 60; // 09:00 => 540
  const A_end = 17 * 60; // 17:00 => 1020

  const B_start = 17 * 60; // 17:00 => 1020
  const B_end = 1 * 60; // 01:00 => 60 (next day)

  const C_start = 1 * 60; // 01:00 => 60
  const C_end = 9 * 60; // 09:00 => 540

  // Shift A: 09:00 <= t < 17:00
  if (totalMinutes >= A_start && totalMinutes < A_end) return "A";

  // Shift B: 17:00 <= t <= 23:59 OR 00:00 <= t < 01:00 (wrap around)
  if (totalMinutes >= B_start || totalMinutes < B_end) return "B";

  // Shift C: 01:00 <= t < 09:00
  if (totalMinutes >= C_start && totalMinutes < C_end) return "C";

  // Fallback
  return "Unknown";
}

module.exports = getShift;
