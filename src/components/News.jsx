import React from "react";
import moment from "moment";
import { Typography, Card, Row, Col, Avatar, Select } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const defaultCryptoImg =
  "https://bernardmarr.com/img/What%20is%20the%20Difference%20Between%20Blockchain%20And%20Bitcoin.png";

const News = ({ simplified }) => {
  const count = simplified ? 5 : 10;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count,
  });
  console.log("News ", cryptoNews);

  if (isFetching) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
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
