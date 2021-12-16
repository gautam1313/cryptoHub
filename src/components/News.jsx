import React, { useState } from "react";
import moment from "moment";
import { Typography, Card, Row, Col, Avatar, Select } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const defaultCryptoImg =
  "https://bernardmarr.com/img/What%20is%20the%20Difference%20Between%20Blockchain%20And%20Bitcoin.png";

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(10);
  const count = simplified ? 5 : 10;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  if (isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Select
            placeholder="Select Crypto"
            optionFilterProp="label"
            className="select-news"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(inputValue, option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency" key="9148094">
              Cryptocurrency
            </Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name} key={coin.id}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || defaultCryptoImg}
                  alt="news"
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)} ...`
                  : news.description}
              </p>
              <div className="provider-container">
                <Text>{news?.provider[0]?.name}</Text>
                <Text>
                  {moment(news.datePublished).startOf("seconds").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
