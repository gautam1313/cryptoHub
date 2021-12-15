import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  FundOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [screenSize, setScreenSize] = useState(null);
  const [activeMenu, setActiveMenu] = useState(true);

  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleScreenSize);
    handleScreenSize();

    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} key="a">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key="b">
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key="c">
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key="d">
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
