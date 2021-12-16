import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Collapse, Row, Col, Avatar, Typography } from "antd";

import Loader from "./Loader";
import { useGetExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangeInfo = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6} style={{ textAlign: "left" }}>
          Exchanges
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          24h Trade Volume
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          Markets
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          Change
        </Col>
      </Row>
      <Row>
        {exchangeInfo.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row
                    key={exchange.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Col span={6} style={{ textAlign: "left" }}>
                      <Text>
                        <strong>{exchange.rank}</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text style={{ whiteSpace: "nowrap" }}>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6} style={{ textAlign: "center" }}>
                      ${millify(exchange.volume)}
                    </Col>
                    <Col span={6} style={{ textAlign: "center" }}>
                      {millify(exchange.numberOfMarkets)}
                    </Col>
                    <Col span={6} style={{ textAlign: "center" }}>
                      {millify(exchange.marketShare)}%
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
