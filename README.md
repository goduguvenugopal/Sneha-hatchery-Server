 ⚡ Generator Logs Management System – Backend

This is the backend service for the Generator Logs Management System. It powers the APIs for managing generator runtime logs, employees, role-based access, cron jobs, and Web Push Notifications to keep employees informed in real-time.

📌 Features
🔹 Generator Logs

Log generator onTime, offTime, duration.

Auto-calculate duration in minutes → hours & minutes.

Retrieve logs with filters (date range, generator ID, status).

Export/print-ready logs for reporting.

🔹 Employees

Employee CRUD operations (Create, Read, Update, Delete).

Role-based access:

Employee → Operate generators & log usage.

Incharge → Access admin dashboard & view all logs.

Manager → Full admin control + employee management.

🔹 Cron Jobs & Alerts

node-cron runs every 10 minutes.

Automatically calculates running duration.

Triggers web push notifications for all employees to stay updated.

🔹 Web Push Notifications

Uses Web Push + Service Workers to send real-time alerts.

Employees receive instant “Generator Running Duration” updates.

Works across desktop & mobile browsers.

⚙️ Tech Stack

Node.js – Runtime environment.

Express.js – REST API framework.

MongoDB + Mongoose – NoSQL database & ODM.

node-cron – Scheduled tasks for duration alerts.

web-push – For sending push notifications to clients.

dotenv – Environment variable management.