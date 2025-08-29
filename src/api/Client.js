import axios from "axios";

const dashboardBaseURL = import.meta.env.VITE_DASHBOARD_API;
const alertBaseURL = import.meta.env.VITE_ALERT_API;

// costBE API (9090 포트)
export const dashboardClient = axios.create({
  baseURL: dashboardBaseURL,
  timeout: 5000,
});

// Alarm Service API (9000 포트)
export const alertClient = axios.create({
  baseURL: alertBaseURL,
  timeout: 20000,
});

export default dashboardClient;
