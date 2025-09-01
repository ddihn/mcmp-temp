import axios from "axios";
import { ERROR_MESSAGES } from "../constants/errorMessages";

function createClient(baseURL, timeout = 5000) {
  const client = axios.create({ baseURL, timeout });

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      const mapping =
        ERROR_MESSAGES[status] ||
        (status >= 300 && status < 400
          ? ERROR_MESSAGES.DEFAULT_3XX
          : status >= 400 && status < 500
          ? ERROR_MESSAGES.DEFAULT_4XX
          : status >= 500
          ? ERROR_MESSAGES.DEFAULT_5XX
          : ERROR_MESSAGES.UNKNOWN);

      const formattedError = {
        status,
        code: mapping.code,
        userMessage: mapping.userMessage,
        raw: error,
      };

      // 콘솔에서는 상세 확인 가능
      console.error(`[API Error] ${status} ${mapping.code}`, error);

      return Promise.reject(formattedError);
    }
  );

  return client;
}
// costBE API (9090 포트)
export const dashboardClient = createClient(
  import.meta.env.VITE_DASHBOARD_API,
  5000
);
// Alarm Service API (9000 포트)
export const alertClient = createClient(import.meta.env.VITE_ALERT_API, 20000);
