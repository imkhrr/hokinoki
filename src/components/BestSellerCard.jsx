import React, { useEffect, useState } from "react";

import { Panel, Icon } from "rsuite";

const BestSellerCard = (props) => {

    const [data, setData] = useState([])

    useEffect(() => {
        setData(props.listData)
    }, [props.listData])

    return (
        <Panel className="is-bg-teal is-white" bordered style={{ height: "55vh" }}>
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
                {
                    data.map((item, index) => (
                        <dl key={index} className={`animate__animated animate__fadeIn animate__delay-${index}s`}>
                            <dt className="t3" style={{ fontWeight: "normal" }}>{item.commodity.name}</dt>
                            <dd className="flex jc-sb" >
                                <span style={{ fontWeight: "lighter" }}>Total Penjualan</span>
                                <span style={{ fontWeight: 780 }}>{item.total_sold}</span>
                            </dd>
                        </dl>
                    ))
                }
            </div>
        </Panel>
    );
};

export default BestSellerCard;
