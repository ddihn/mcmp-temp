const hostname = window.location.hostname;

// 로컬 개발 환경일 때만 mock 사용
export const USE_MOCK = ["localhost", "127.0.0.1"].includes(hostname);
