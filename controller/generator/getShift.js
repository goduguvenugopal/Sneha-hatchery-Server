// get shift function based on current time

function getShift(date = new Date()) {
  // Convert to IST (UTC +5:30)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const istDate = new Date(utc + 5.5 * 60 * 60 * 1000);
 

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const totalMinutes = hours * 60 + minutes; // 0 .. 1439

  const A_start = 9 * 60;  // 09:00
  const A_end = 17 * 60;   // 17:00

  const B_start = 17 * 60; // 17:00
  const B_end = 1 * 60;    // 01:00 next day

  const C_start = 1 * 60;  // 01:00
  const C_end = 9 * 60;    // 09:00

  if (totalMinutes >= A_start && totalMinutes < A_end) {
    return "A";
  }
  if (totalMinutes >= B_start || totalMinutes < B_end) {
    return "B";
  }
  if (totalMinutes >= C_start && totalMinutes < C_end) {
    return "C";
  }

  return "Unknown";
}

module.exports = getShift;
