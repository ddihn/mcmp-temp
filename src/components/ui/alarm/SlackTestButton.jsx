import React, { useState } from "react";
import Button from "../../common/button/Button";
import axios from "axios";
import ENDPOINT from "../../../api/alarm/alarm";

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

  const handleSlackTest = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        userId,
        message: "이상 비용이 발생하였습니다. (테스트 메시지)",
      });

      const res = await axios.post(
        `${ENDPOINT.alaram}/api/costopti/alert/sendSlackAC`,
        params
      );

      alert(res.data || "Slack 메시지가 전송되었습니다.");
    } catch (err) {
      console.error(err);
      alert("오류가 발생하여 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" disabled={loading} onClick={handleSlackTest}>
      {loading ? "Sending..." : "Slack Test"}
    </Button>
  );
}
