import { useState } from "react";
import Modal from "../../../common/modal/Modal";
import Button from "../../../common/button/Button";
import InputField from "../../../common/input/InputField";
import Card from "../../../common/card/Card";
import Alert from "../../../common/alert/Alert";
import { alertClient } from "../../../../api/Client";

export default function MailTestModal() {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSendMail = async () => {
    try {
      const payload = {
        to: [to],
        subject: title,
        message: "테스트 메일입니다.",
      };

      await alertClient.post("/sendAlertMail", payload);
      setAlert({
        variant: "success",
        title: "성공",
        message: "메일이 정상적으로 발송되었습니다.",
      });
    } catch (err) {
      console.error("Mail Test Error:", err);
      setAlert({
        variant: "danger",
        title: "실패",
        message: "메일 발송 중 오류가 발생했습니다.",
      });
    } finally {
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
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSendMail}>
              Send Mail
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
            label="받는 사람"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Input To"
            dense
            divider
            showRowDivider
          />

          <InputField
            label="제목"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input Mail Title"
            dense
            divider
          />
        </Card>
      </Modal>
      {alert && (
        <div className="p-3">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            dismissible
            duration={0}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
    </>
  );
}
