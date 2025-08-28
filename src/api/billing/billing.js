import client from "../Client";
import { USE_MOCK } from "../../config/env";
import { chartData, top5billData, billingAsset } from "../../config/mockData";

// 이번달 요약 (지난달 대비)
export const getCurMonthBill = (payload) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: chartData });
  }
  return client.post("/getCurMonthBill", payload);
};

// 이번달 상위 5개 리소스
export const getTop5Bill = (payload) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: top5billData });
  }
  return client.post("/getTop5Bill", payload);
};

// 이번달 서비스별 비용
export const getBillAsset = (payload) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: billingAsset });
  }
  return client.post("/getBillAsset", payload);
};
