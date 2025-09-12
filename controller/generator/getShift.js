// get shift function based on current time
const getShift = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // A shift: 09:00 - 16:59
  if (hours > 9 && hours < 17) return "A";
  if (hours === 9 && minutes >= 0) return "A";
  if (hours === 16 && minutes < 60) return "A";

  // B shift: 17:00 - 00:59
  if (hours > 17 || hours < 1) return "B";
  if (hours === 17 && minutes >= 0) return "B";
  if (hours === 0 && minutes < 60) return "B";

  // C shift: 01:00 - 08:59
  return "C";
};

module.exports = getShift;
