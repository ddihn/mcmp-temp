import axios from "axios";
import ENDPOINT from "../Endpoints";

/**
 * Alarm API 모듈
 * Slack / Mail 연동 관련 API 함수들을 모아둔 파일
 */
const BASE_URL = ENDPOINT.alaram;

/* ===================== Slack API ===================== */

/**
 * Slack 초기 설정 불러오기
 * @param {string} userId - 사용자 ID
 */
export const getSlackInfo = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/costopti/alert/getSlackIF`, {
    params: { userId },
  });
  return res.data;
};

/**
 * Slack 토큰 저장
 * @param {object} params { id, token, channel }
 */
export const insertSlackToken = async (params) => {
  const res = await axios.post(
    `${BASE_URL}/api/costopti/alert/insertSlackToken`,
    params
  );
  return res.data;
};

/**
 * Slack 알람 전송 (테스트 포함)
 * @param {string} userId - 사용자 ID
 * @param {string} message - 전송 메시지
 * @param {string} [linkUrl] - 선택: 링크 URL
 * @param {string} [linkText] - 선택: 링크 텍스트
 */
export const sendSlackAlarm = async (userId, message, linkUrl, linkText) => {
  const params = new URLSearchParams({ userId, message });
  if (linkUrl) params.append("linkUrl", linkUrl);
  if (linkText) params.append("linkText", linkText);

  const res = await axios.post(
    `${BASE_URL}/api/costopti/alert/sendSlackAC`,
    params
  );
  return res.data;
};

/* ===================== Mail API ===================== */

/**
 * 메일 설정 불러오기
 */
export const getMailInfo = async () => {
  const res = await axios.get(`${BASE_URL}/api/costopti/alert/getMailInfo`);
  return res.data;
};

/**
 * 메일 정보 저장
 * @param {object} params { username, password }
 */
export const insertMailInfo = async (params) => {
  const res = await axios.post(
    `${BASE_URL}/api/costopti/alert/insertMailInfo`,
    params
  );
  return res.data;
};

/**
 * 테스트 메일 전송
 * @param {string} to - 받는 사람 이메일
 * @param {string} subject - 메일 제목
 */
export const sendTestMail = async (to, subject) => {
  const mailTo = [to];
  const res = await axios.post(`${BASE_URL}/api/costopti/alert/sendAlertMail`, {
    to: mailTo,
    subject,
  });
  return res.data;
};

/* ===================== Export ===================== */
const alarmApi = {
  getSlackInfo,
  insertSlackToken,
  sendSlackAlarm,
  getMailInfo,
  insertMailInfo,
  sendTestMail,
};

export default alarmApi;
