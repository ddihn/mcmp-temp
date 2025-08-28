import React, { useState } from "react";
import Button from "../../common/button/Button";

/**
 * @component SlackTestButton
 * @description
 * Slack Test 알람 전송 버튼.
 * 클릭 시 API를 호출하여 Slack 채널로 테스트 메시지를 보냅니다.
 *
 * @prop {string} [userId="test"] - 사용자 ID (기본값 "test")
 */
export default function SlackTestButton({ userId = "test" }) {
  const [loading, setLoading] = useState(false);

  return (
    // <Button variant="secondary" disabled={loading} onClick={handleSlackTest}>
    //   {loading ? "Sending..." : "Slack Test"}
    // </Button>
    <Button variant="secondary" disabled={loading}>
      {loading ? "Sending..." : "Slack Test"}
    </Button>
  );
}
