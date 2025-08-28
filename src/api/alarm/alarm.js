import client from "../Client";
import { USE_MOCK } from "../../config/env";
import { alarmHistoryData } from "../../config/mockData";

export const getAlarmHistory = async (req) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: alarmHistoryData });
  }
  return client.post("/alarm/history", req);
};
