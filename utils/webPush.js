const webpush = require("web-push");

// VAPID keys (generate once with web-push CLI)
webpush.setVapidDetails(
  "mailto:venuiti97@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = webpush;
