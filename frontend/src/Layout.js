import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ApartmentOutlined,
  StockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import imageSrc from "./logo.png";

const { Header, Content, Footer, Sider } = Layout;
const loggedInUserType = localStorage.getItem("loggedInUserType");

const adminUserItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    label: "Home",
    
  },
  {
    key: "Category",
    icon: <HomeOutlined />,
    label: "Category",
  },
  {
    key: "Complaint",
    icon: <HomeOutlined />,
    label: "Complaint",
  },
  {
    key: "FeedBack",
    icon: <HomeOutlined />,
    label: "FeedBack",
  },
  {
    key: "My Profile",
    icon: <HomeOutlined />,
    label: "My Profile",
  },
  {
    key: "AboutUs",
    icon: <CalendarOutlined />,
    label: "About Us",
    children: [
      {
        key: "Branches",
        icon: <AppstoreAddOutlined />,
        label: "Our Branches",
      },
      {
        key: "About",
        icon: <CheckCircleOutlined />,
        label: "Who we are",
      },
    ],
  },
  {
    key: "ContactUs",
    icon: <ApartmentOutlined />,
    label: "Contact Us",
    children: [
      {
        key: "Customer",
        icon: <StockOutlined />,
        label: "As a customer",
      },
      {
        key: "Employee",
        icon: <SyncOutlined />,
        label: "As a Employee",
      },
    ],
  },
];

const headerIteam = [
  { key: "1", text: "User", icon: <UserSwitchOutlined /> },
  { key: "2", text: "LogOut", icon: <LogoutOutlined /> },
];

const App = ({ children, userType }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleHeaderClick = (key) => {
    if (key === "2") {
      localStorage.setItem("authToken", null);
      localStorage.setItem("loggedInUserType", null);
      navigate("/");
    }
  };

  const [isBackTopVisible, setIsBackTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsBackTopVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = (item) => {
    if (item.key === "dashboard") {
      navigate("/dashboard");
    }

    if (item.key === "ContactUs") {
      navigate("/contact");
    }
    if (item.key === "Customer") {
      navigate("/customerc");
    }
    if (item.key === "Employee") {
      navigate("/employeec");
    }
    if (item.key === "About") {
      navigate("/about");
    }
    if (item.key === "Feedback") {
      navigate("/feed");
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{ backgroundColor: '#543310', }}
      >
        {!collapsed && (
          <div style={{ textAlign: "center" }}>
            <img src={imageSrc} alt="Logo" style={{ width: "80%", margin: "20px 0" }} />
          </div>
        )}
        <Menu
          theme="light"
          color="#DAC0A3"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={userType === "admin" ? adminUserItems : adminUserItems}
          onClick={handleMenuClick}
          style={{ position: "sticky", marginTop: "10px",backgroundColor:"#DAC0A3"}}
          
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: "19%",
            backgroundColor: "#DAC0A3",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="demo-logo" />
          {collapsed && (
          <div style={{ textAlign: "center" }}>
            <img src={imageSrc} alt="Logo" style={{ width: "130%", margin: "80px 0" }} />
          </div>
        )}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {headerIteam.map((item) => (
              <Button
                key={item.key}
                type="text"
                icon={item.icon}
                style={{ color: "Black",fontSize:"20px" }}
                onClick={() => handleHeaderClick(item.key)}
              >
                {item.text}
              </Button>
            ))}
          </div>
        </Header>
        <Content style={{ margin: "0 20px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: borderRadiusLG,
              
            }}
          >
            {isBackTopVisible && (
              <FloatButton.Group shape="circle" style={{ right: 24 }}>
                <FloatButton.BackTop visibilityHeight={0} />
              </FloatButton.Group>
            )}
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default App;
