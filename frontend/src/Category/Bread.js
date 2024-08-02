import React from 'react';
import styled from 'styled-components';

import { Layout, Typography,
  Form,
  Input,
  Space,
  Button,
  Modal,
  message,} from "antd";
import LayoutNew from '../Layout';
import {
  PlusOutlined,
  StockOutlined,

} from "@ant-design/icons";
import backgroundImage from '../p1.jpg'; // Replace this with the actual background image path

const { Title } = Typography;
const { Content } = Layout;
const Bread = () => {
  return (
    <div className="about">
   <LayoutNew>
   <Layout>
  
  <ContentWrapper>
            
      <Content style={{ padding: "24px" }}>
          <Space
            style={{
              background: "#543310",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Space>
              <StockOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
              <Title
                level={2}
                style={{ fontSize: "24px", marginTop: "8px", color: "white" }}
              >
                Bread
              </Title>
            </Space>
          </Space>
        </Content>
          </ContentWrapper>
    

</Layout>
   </LayoutNew>

      </div>
  );
}
const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  background-color: rgba(214, 218, 200, 0.70); /* RGBA color with alpha for transparency */
  padding: 1px;
  border-radius: 8px;
  text-align: center;
  max-width: 100%;
  width:100%; /* Ensure this is not too wide for mobile */
`;

export default Bread;
