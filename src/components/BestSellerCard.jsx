import React from "react";

import { Col, Row, Panel, Icon } from "rsuite";

const BestSellerCard = (props) => {
  return (
    <Panel className="is-bg-teal is-white" bordered>
      <div className="flex jc-sb">
        <div>
          <span className="t4">{props.viewdate}</span>
          <div>
            <span className="t3">{props.cardname}</span>
          </div>
        </div>

        <div className="pt-1 pr-1">
          <Icon icon={props.iconname} size="2x" />
        </div>
      </div>

      <div className="pt-2">
        <Row>
          <Col xs={20} sm={20} md={15}>
            <ul className="pl-0" style={{ listStyle: "none" }}>
              <li>Nanas Muda</li>
              <li>Semangka</li>
              <li>Anggur Merah</li>
              <li>Tomat</li>
              <li>Bayam</li>
              <li>Pepaya</li>
              <li>Bawang Merah</li>
              <li>Gula</li>
            </ul>
          </Col>
          <Col xs={4} sm={4} md={9}>
            <div className="pr-1">
              <ul style={{ listStyle: "none", textAlign: "right" }}>
                <li>32</li>
                <li>27</li>
                <li>21</li>
                <li>19</li>
                <li>14</li>
                <li>8</li>
                <li>4</li>
                <li>2</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Panel>
  );
};

export default BestSellerCard;
