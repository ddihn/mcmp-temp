import client from "../Client";
import { USE_MOCK } from "../../config/env";
import {
  baseInfoData,
  summaryBillData,
  InvoiceData,
} from "../../config/mockData";

// 베이스 정보 조회
export const getBillingBaseInfo = (payload) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: baseInfoData });
  }
  return client.post("/invoice/getBillingBaseInfo", payload);
};

// 월별 요약 조회
export const getInvoiceSummary = (payload) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: summaryBillData });
  }
  return client.post("/invoice/getSummary", payload);
  ㄴ;
};

// 이번달 인보이스 상세 조회
export const getInvoice = (payload) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: InvoiceData });
  }
  return client.post("/invoice/getInvoice", payload);
};
