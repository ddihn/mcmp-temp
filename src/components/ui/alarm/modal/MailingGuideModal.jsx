import React, { useState } from "react";
import Modal from "../../../common/modal/Modal";
import GuideStep from "../../../common/guide/GuideStep";
import Button from "../../../common/button/Button";
import { mailingGuideStyles } from "../../../../utils/styles/guideStyles";
import InputField from "../../../common/input/InputField";
import Card from "../../../common/card/Card";

export default function MailingGuideModal() {
  const [open, setOpen] = useState(false);
  const [mailUserId, setMailUserId] = useState("");
  const [mailAppPassword, setMailAppPassword] = useState("");

  const handleSave = () => {
    console.log("Mail User ID:", mailUserId);
    console.log("Mail App Password:", mailAppPassword);
    // TODO: API 연동 로직 추가
    setOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Mailing Apply/Guide
      </Button>

      <Modal
        id="mailingGuideModal"
        open={open}
        onClose={() => setOpen(false)}
        title="Mailing Guide"
        size="lg"
        centered
        scrollable
        footer={
          <div className="d-flex justify-content-between w-100">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        }
      >
        <p style={mailingGuideStyles.guideNote}>
          본 가이드는 Gmail을 통해 알림 받는 과정만을 포함하고 있습니다. <br />
          사전에 메일 제공 주최가 되는 계정을 만들어 주시기 바랍니다.
        </p>

        <h2 style={mailingGuideStyles.h2}>1. Gmail 설정 변경</h2>
        <GuideStep
          styles={mailingGuideStyles}
          step="1-1."
          img="/images/mailingGuide/mailingIMG01.png"
          alt="Slide 1"
        >
          <p style={mailingGuideStyles.comment}>
            메일을 제공할 계정으로 로그인한 후 Gmail의 <strong>설정 탭</strong>
            에서 '전달 및 POP/IMAP' 탭에 접속하여 <strong>IMAP 사용</strong>을
            체크하고 저장합니다.
          </p>
          <blockquote style={mailingGuideStyles.blockquote}>
            <p style={mailingGuideStyles.comment}>
              IMAP은 전자 메일에 액세스하기 위한 방법입니다.
            </p>
          </blockquote>
        </GuideStep>

        <h2 style={mailingGuideStyles.h2}>2. 앱 비밀번호 설정</h2>
        <GuideStep
          styles={mailingGuideStyles}
          step="2-1."
          img="/images/mailingGuide/mailingIMG02.png"
          alt="Slide 2"
        >
          <p style={mailingGuideStyles.comment}>
            Google 계정 설정에 접속하여 <strong>'앱 비밀번호'</strong> 설정을
            위한 페이지로 이동합니다.
          </p>
          <blockquote style={mailingGuideStyles.blockquote}>
            <p style={mailingGuideStyles.comment}>
              앱 비밀번호는 <strong>2단계 인증</strong>이 설정된 계정에서만
              이용할 수 있습니다. '앱 비밀번호'가 뜨지 않는 경우{" "}
              <strong>2단계 인증</strong>을 먼저 설정해주시기 바랍니다. <br />
              <img
                style={mailingGuideStyles.guideIMG}
                src="/images/mailingGuide/mailingIMG02-1.png"
                alt="Slide 2-1"
              />
            </p>
          </blockquote>
        </GuideStep>

        <GuideStep
          styles={mailingGuideStyles}
          step="2-2."
          img="/images/mailingGuide/mailingIMG03.png"
          alt="Slide 3"
        >
          <p style={mailingGuideStyles.comment}>
            앱 이름으로 원하는 이름을 입력한 뒤 <strong>'만들기'</strong> 버튼을
            선택합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={mailingGuideStyles}
          step="2-3."
          img="/images/mailingGuide/mailingIMG04.png"
          alt="Slide 4"
        >
          <p style={mailingGuideStyles.comment}>앱 비밀번호가 발급됩니다.</p>
          <blockquote style={mailingGuideStyles.blockquote}>
            <p style={mailingGuideStyles.comment}>
              <strong>
                발급 받은 앱 비밀번호는 MCMP Mail 알림 설정을 위해 마지막 단계에
                필요하며 앱 비밀번호는 다시 조회할 수 없으므로 잘 기억해두시기
                바랍니다.
              </strong>
            </p>
          </blockquote>
        </GuideStep>

        <h2 style={mailingGuideStyles.h2}>3. Mail 연동</h2>
        <GuideStep
          styles={mailingGuideStyles}
          step="3-1."
          img="/images/mailingGuide/mailingIMG05.png"
          alt="Slide 5"
        >
          <p style={mailingGuideStyles.comment}>
            MCMP Alarm 탭에서 Mailing Guide 버튼을 선택합니다.
          </p>
          <p style={mailingGuideStyles.comment}>
            4 단계의 Mail 연동 설정 파트에서 Mail User ID와 App Password를
            입력하고 저장합니다.
          </p>
          <p style={mailingGuideStyles.comment}>
            모달 외부의 Mail Test 버튼을 통해 Mail 연동을 테스트할 수 있습니다.
          </p>
        </GuideStep>

        <h2 style={mailingGuideStyles.h2}>4. Mail 연동 설정</h2>
        <blockquote style={mailingGuideStyles.blockquote}>
          <p style={mailingGuideStyles.comment}>
            메일을 발송할 주체가 되는 Gmail 계정 ID와 <strong>2-3 단계</strong>
            에서 발급받은 App Password를 입력해주세요.
          </p>
          <p style={mailingGuideStyles.comment}>
            <strong>
              Mail User ID와 App Password는 저장 버튼을 누를 때마다 저장되며 한
              번 저장한 뒤로 추가로 입력하지 않아도 됩니다.
            </strong>
          </p>
        </blockquote>

        {/* 입력폼 */}
        <Card>
          <InputField
            label="Mail User ID"
            value={mailUserId}
            onChange={(e) => setMailUserId(e.target.value)}
            placeholder="Input Mail User ID"
            dense
            divider
            showRowDivider
          />
          <InputField
            label="Mail App Password"
            type="password"
            value={mailAppPassword}
            onChange={(e) => setMailAppPassword(e.target.value)}
            placeholder="Input Mail App Password"
            dense
            divider
            inputMaxWidth="350px"
          />
        </Card>
      </Modal>
    </>
  );
}
