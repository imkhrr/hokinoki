import React from "react";
import { Col, Row, Panel, Icon } from "rsuite";

const StatCard = (props) => {
  return (
    <Col className="py-1" xs={24} sm={8} md={8}>
      <Panel
        className={`is-bg-${props.bgcolor} is-${props.textcolor}`}
        bordered
      >
        <Row>
          <Col xs={18} sm={18} md={18}>
            <span className="t4">{props.viewdate}</span>
            <div>
              <span className="t0">{props.count}</span>
            </div>
            <span className="t3">{props.cardname}</span>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <div className="pt-4">
              <Icon icon={props.iconname} size="2x" />
            </div>
          </Col>
        </Row>
      </Panel>
    </Col>
  );
};

export default StatCard;
