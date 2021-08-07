import React, { useEffect, useState } from "react";
import { Col, Row, Panel, Icon } from "rsuite";

const StatCard = (props) => {

    const [animateIn, setAnimateIn] = useState('');
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (props.count != 0) {
            setAnimateIn('animate__flipOutX');
            setTimeout(() => {
                setCount(props.count)
                setAnimateIn('animate__flipInX')
            }, 500);
        }
    }, [props.count])

    return (
        <Col className="py-1" xs={24} sm={8} md={8}>
            <Panel
                className={`is-bg-${props.bgcolor} is-${props.textcolor}`}
                bordered
            >
                <Row>
                    <Col xs={18} sm={18} md={18}>
                        <span className="t4">{props.viewdate}</span>
                        <div className={`animate__animated ${animateIn}`}>
                            <span className="t0">{count}</span>
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
