import { Anchor, Col, Row, Space } from "antd";
import { MainContainer } from "../../layout";
import { demoFormItemData } from "./demoFormItemData";

export const DemoFormItems = () => {

  return (
    <MainContainer scrolly={true}>
      <Row gutter={[16, 16]}>
        <Col span={20}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            {demoFormItemData.map((item) => (
              <div key={item.key}>{item.element}</div>
            ))}
          </Space>
        </Col>
        <Col span={4}>
          <Anchor
            getContainer={() =>
              document.querySelector('.scroll-container') as HTMLElement
            }
            items={demoFormItemData}
          />
        </Col>
      </Row>
    </MainContainer>
  );
};