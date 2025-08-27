import React, { useState } from "react";
import Modal from "../../../common/modal/Modal";
import GuideStep from "../../../common/guide/GuideStep";
import Button from "../../../common/button/Button";
import { slackGuideStyles } from "../../../../utils/styles/guideStyles";
import InputField from "../../../common/input/InputField";
import Card from "../../../common/card/Card";

export default function SlackGuideModal() {
  const [open, setOpen] = useState(false);
  const [slackToken, setSlackToken] = useState("");
  const [channelId, setChannelId] = useState("");

  const handleSave = () => {
    console.log("Slack Token:", slackToken);
    console.log("Channel ID:", channelId);
    // TODO: API 연동 로직 추가
    setOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Slack Apply/Guide
      </Button>

      <Modal
        id="slackGuideModal"
        open={open}
        onClose={() => setOpen(false)}
        title="Slack Apply/Guide"
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
        <p style={slackGuideStyles.guideNote}>
          본 가이드는 Slack을 통한 알림을 받기만을 위한 과정을 포함하고
          있습니다. <br />
          Slack 계정이 존재하지 않을 경우에 대한 회원가입 과정은 포함하지 않고
          있습니다.
        </p>

        <h2 style={slackGuideStyles.h2}>1. Slack ChatBot 생성 및 권한 설정</h2>
        <GuideStep
          styles={slackGuideStyles}
          step="1-1."
          img="/images/slackGuide/slackIMG01.png"
          alt="Slide 1"
        >
          <p style={slackGuideStyles.comment}>
            https://api.slack.com 으로 접속하여 <strong>'Your apps'</strong>를
            클릭합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="1-2."
          img="/images/slackGuide/slackIMG02.png"
          alt="Slide 2"
        >
          <p style={slackGuideStyles.comment}>
            <strong>'Create New App'</strong> 버튼을 클릭합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="1-3."
          img="/images/slackGuide/slackIMG03.png"
          alt="Slide 3"
        >
          <p style={slackGuideStyles.comment}>
            이후 생성할 앱 세팅은 <strong>'From scratch'</strong>로 선택합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="1-4."
          img="/images/slackGuide/slackIMG04.png"
          alt="Slide 4"
        >
          <blockquote style={slackGuideStyles.blockquote}>
            <p style={slackGuideStyles.comment}>
              <strong>App Name</strong> : 알람을 보내줄 챗 봇 앱의 이름입니다.
            </p>
          </blockquote>
          <p style={slackGuideStyles.comment}>
            챗봇 앱을 생성할 워크스페이스를 지정한 뒤{" "}
            <strong>'Create App'</strong>을 클릭합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="1-5."
          img="/images/slackGuide/slackIMG05-1.png"
          alt="Slide 5"
        >
          <p style={slackGuideStyles.comment}>
            Bot 앱이 알림을 보낼 수 있도록 권한을 지정해 주기 위해{" "}
            <strong>'OAuth & Permissions'</strong>탭에서{" "}
            <strong>'Scopes'</strong> 영역으로 이동합니다. <br />
            <br />
            <strong>'Add an OAuth Scope'</strong> 버튼을 클릭하고 Bot 앱이
            알림을 보낼 수 있도록 <strong>'chat:write' 권한을 허용</strong>
            합니다.
          </p>
        </GuideStep>

        <h2 style={slackGuideStyles.h2}>2. Slack 앱 설치 및 토큰 발급</h2>
        <GuideStep
          styles={slackGuideStyles}
          step="2-1."
          img="/images/slackGuide/slackIMG07.png"
          alt="Slide 6"
        >
          <p style={slackGuideStyles.comment}>
            지금까지 설정한 앱을 워크스페이스에 설치하기 위해{" "}
            <strong>'Install to Workspace'</strong>버튼을 클릭합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="2-2."
          img="/images/slackGuide/slackIMG07-1.png"
          alt="Slide 7"
        >
          <p style={slackGuideStyles.comment}>
            생성한 앱이 워크스페이스에 접근하여 설치될 수 있도록 권한을
            허용해줍니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="2-3."
          img="/images/slackGuide/slackIMG08.png"
          alt="Slide 8"
        >
          <p style={slackGuideStyles.comment}>
            앱 설치가 완료되면 앱에 대한 <strong>OAuth Token을 발급</strong>{" "}
            받습니다.
          </p>
          <blockquote style={slackGuideStyles.blockquote}>
            <p style={slackGuideStyles.comment}>
              <strong>
                발급 받은 토큰은 MCMP 알림 설정을 위해 마지막 단계에 필요하며
                토큰이 외부로 노출되지 않도록 주의해야 합니다.
              </strong>
            </p>
          </blockquote>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="2-4."
          img="/images/slackGuide/slackIMG09-1.png"
          alt="Slide 9"
        >
          <p style={slackGuideStyles.comment}>
            Slack App을 열고 생성한 워크스페이스, 채널로 이동합니다.
          </p>
          <p style={slackGuideStyles.comment}>
            채널명을 클릭합니다. (예시 : #alarm-channel)
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="2-5."
          img="/images/slackGuide/slackIMG10-1.png"
          alt="Slide 10"
        >
          <p style={slackGuideStyles.comment}>
            우측 상단에서 <strong>'이 channel의 모든 멤버 보기'</strong>를 누른
            후 <strong>'통합'</strong> 탭에서 <strong>'앱 추가'</strong> 버튼을
            클릭합니다.
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="2-6."
          img="/images/slackGuide/slackIMG12.png"
          alt="Slide 12"
        >
          <p style={slackGuideStyles.comment}>생성한 앱을 채널에 추가합니다.</p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="2-7."
          img="/images/slackGuide/slackIMG13.png"
          alt="Slide 13"
        >
          <p style={slackGuideStyles.comment}>
            채널 정보창으로 돌아와서 <strong>채널 ID</strong>를 확인합니다.
          </p>
          <blockquote style={slackGuideStyles.blockquote}>
            <p style={slackGuideStyles.comment}>
              <strong>
                확인한 채널의 ID는 MCMP 알림 설정을 위해 마지막 단계에
                필요합니다.
              </strong>
            </p>
          </blockquote>
        </GuideStep>

        <h2 style={slackGuideStyles.h2}>3. MCMP Slack Alarm 연동</h2>
        <GuideStep
          styles={slackGuideStyles}
          step="3-1."
          img="/images/slackGuide/slackIMG14.png"
          alt="Slide 14"
        >
          <p style={slackGuideStyles.comment}>
            Slack 챗봇 생성 및 토큰 발급 가이드를 열 수 있습니다.
          </p>
          <p style={slackGuideStyles.comment}>
            <strong>발급받은 OAuth Token과 Channel ID를 입력합니다.</strong>
          </p>
        </GuideStep>

        <GuideStep
          styles={slackGuideStyles}
          step="3-2."
          img="/images/slackGuide/slackIMG15.png"
          alt="Slide 15"
        >
          <p style={slackGuideStyles.comment}>
            입력한 Token과 Channel ID를 <strong>저장</strong>합니다.
          </p>
          <p style={slackGuideStyles.comment}>
            Slack 연동 설정을 끝낸 후 Slack Test 버튼을 통해 알람 테스트를
            진행할 수 있습니다.
          </p>
        </GuideStep>

        <h2 style={slackGuideStyles.h2}>4. MCMP Slack 연동 설정</h2>
        <blockquote style={slackGuideStyles.blockquote}>
          <p style={slackGuideStyles.comment}>
            <strong>2-2 단계</strong>에서 발급 받은 Workspace OAuth Token과{" "}
            <strong>2-7 단계</strong>에서 확인한 채널 ID를 입력해주세요.
          </p>
          <p style={slackGuideStyles.comment}>
            <strong>
              Slack App Token과 Channel ID는 저장 버튼을 누를 때마다 저장되며 한
              번 저장한 뒤로 추가로 입력하지 않아도 됩니다.
            </strong>
          </p>
        </blockquote>

        {/* 입력폼 */}
        <Card>
          <InputField
            label="Slack App Token"
            value={slackToken}
            onChange={(e) => setSlackToken(e.target.value)}
            placeholder="Input Slack App Token"
            dense
            divider
            inputMaxWidth="350px"
            showRowDivider
          />

          <InputField
            label="Channel ID"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Input Slack Channel ID"
            dense
            divider
            inputMaxWidth="350px"
          />
        </Card>
      </Modal>
    </>
  );
}
