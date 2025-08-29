import { useState } from "react";
import Modal from "../../../common/modal/Modal";
import Button from "../../../common/button/Button";
import InputField from "../../../common/input/InputField";
import Card from "../../../common/card/Card";
import { alertClient } from "../../../../api/Client";
import { useAlertStore } from "../../../../stores/useAlertStore";

export default function MailTestModal() {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태
  const { addAlert } = useAlertStore();

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const payload = {
        to: [to],
        subject: title,
        message: "테스트 메일입니다.",
      };
      await alertClient.post("/sendAlertMail", payload);
      addAlert({
        variant: "success",
        title: "성공",
        message: "메일이 정상적으로 발송되었습니다.",
      });
    } catch (err) {
      console.error("Mail Test Error:", err);
      addAlert({
        variant: "danger",
        title: "실패",
        message: "메일 발송 중 오류가 발생했습니다.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => setOpen(true)}>
        Mail Test
      </Button>

      <Modal
        id="mailTestModal"
        open={open}
        onClose={() => setOpen(false)}
        title="Mail Test"
        footer={
          <div className="d-flex justify-content-between w-100">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSendMail}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Mail"}
            </Button>
          </div>
        }
      >
        <p className="text-muted">
          메일 테스트에서 받는 사람은 한 사람만 지정 가능합니다.
          <br />
          메일이 30초 이내에 발송됩니다.
        </p>
        <Card>
          <InputField
            label="Recipient"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Input To"
            dense
            divider
            showRowDivider
          />
          <InputField
            label="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input Mail Title"
            dense
            divider
          />
        </Card>
      </Modal>
    </>
  );
}
