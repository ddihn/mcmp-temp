import Card from "../../../common/card/Card";
import { cspColorMap } from "../../../../utils/styles/colors";
import { baseInfoStyles as styles } from "../../../../utils/styles/cardStyles";

function ProviderItem({ name, amount }) {
  return (
    <div style={styles.providerItem}>
      <div style={styles.providerLabel}>
        <span
          style={styles.providerDot(cspColorMap[name] || cspColorMap.OTHERS)}
        />
        {name}
      </div>
      <div style={styles.providerValue}>{amount}</div>
    </div>
  );
}

export default function BaseInfoCard({ totalAmount, providers }) {
  return (
    <Card title="Base Info" titleSize={2}>
      {/* 내부 컨텐츠 maxWidth 제한 */}
      <div style={{ maxWidth: "550px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}>
          <div style={styles.totalLabel}>
            <span style={styles.totalDot}></span>총 금액
          </div>
          <div style={styles.totalValue}>{totalAmount}</div>
        </div>

        <hr style={{ margin: "12px 0", borderColor: "#374151" }} />

        <div style={styles.providerWrapper}>
          {Object.entries(providers).map(([provider, amount]) => (
            <ProviderItem key={provider} name={provider} amount={amount} />
          ))}
        </div>
      </div>
    </Card>
  );
}
