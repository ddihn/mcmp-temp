/**
 * Budget 관련 유틸리티 함수들
 */

import { MONTH_NAMES } from "../constants/dateConstants";
import { getCSPColorClass as getCSPColorClassFromConstants } from "../constants/cspConstants";

// MONTH_NAMES를 re-export하여 기존 import 경로 유지
export { MONTH_NAMES };

/**
 * 통화 기호 반환
 * @param {string} currency - 통화 코드 ("USD" | "KRW")
 * @returns {string} 통화 기호
 */
export const getCurrencySymbol = (currency) => {
  return currency === "USD" ? "$" : "₩";
};

/**
 * 통화 변환 (USD <-> KRW)
 * TODO: 향후 API로 실시간 환율을 받아오도록 변경 예정
 * @param {number} value - 변환할 금액
 * @param {string} currency - 대상 통화 ("USD" | "KRW")
 * @param {number} [exchangeRate=1400] - 환율 (1 USD = KRW)
 * @returns {number} 변환된 금액
 */
export const convertCurrency = (value, currency, exchangeRate = 1400) => {
  if (currency === "KRW") {
    return Math.round(value * exchangeRate);
  }
  return value;
};

/**
 * CSP별 월별 예산 총합 계산
 * @param {Object} cspBudgets - CSP별 월별 예산 데이터
 * @param {string} csp - CSP 이름
 * @returns {number} CSP별 총 예산
 */
export const calculateCSPTotal = (cspBudgets, csp) => {
  if (!cspBudgets[csp]) return 0;
  return cspBudgets[csp].reduce((sum, val) => sum + (val || 0), 0);
};

/**
 * 특정 월의 모든 CSP 예산 총합 계산
 * @param {Object} cspBudgets - CSP별 월별 예산 데이터
 * @param {number} monthIndex - 월 인덱스 (0-11)
 * @returns {number} 해당 월의 총 예산
 */
export const calculateMonthTotal = (cspBudgets, monthIndex) => {
  return Object.values(cspBudgets).reduce((sum, budgets) => {
    return sum + (budgets[monthIndex] || 0);
  }, 0);
};

/**
 * 전체 연간 예산 총합 계산
 * @param {Object} cspBudgets - CSP별 월별 예산 데이터
 * @returns {number} 연간 총 예산
 */
export const calculateYearTotal = (cspBudgets) => {
  return Object.values(cspBudgets).reduce((sum, budgets) => {
    return sum + budgets.reduce((a, b) => a + (b || 0), 0);
  }, 0);
};

/**
 * 월별 예산 대비 실사용량 분석
 * @param {number} budget - 예산
 * @param {number} actual - 실사용량
 * @returns {Object} 분석 결과 (차이, 달성률, 상태)
 */
export const analyzeBudgetPerformance = (budget, actual) => {
  const difference = actual - budget;
  const achievement = budget > 0 ? (actual / budget) * 100 : 0;

  let status = 'on_track';
  if (achievement > 110) status = 'over_budget';
  else if (achievement < 80) status = 'under_budget';

  return {
    difference,
    achievement,
    status,
    isOverBudget: difference > 0,
    isUnderBudget: difference < 0
  };
};

/**
 * CSP별 색상 클래스 반환
 * @deprecated 대신 cspConstants.js의 getCSPColorClass 사용 권장
 * @param {string} csp - CSP 이름
 * @returns {string} Bootstrap 색상 클래스
 */
export const getCSPColorClass = (csp) => {
  return getCSPColorClassFromConstants(csp);
};

/**
 * 예산 입력값 유효성 검사
 * @param {number} value - 입력값
 * @returns {Object} 검사 결과
 */
export const validateBudgetInput = (value) => {
  const numValue = parseFloat(value);

  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Budget must be a positive number' };
  }

  if (numValue > 1000000) {
    return { isValid: false, error: 'Budget seems too high' };
  }

  return { isValid: true, value: numValue };
};

