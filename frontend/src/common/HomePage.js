import React from 'react';
import { Layout,Space,Typography} from "antd";
import LayoutNew from '../Layout';

import { StockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const HomePage = () => {
  return (
   <LayoutNew>
   <Layout>
<div>
<Space
            style={{
              background: "#B67352",
              color: "black",
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
                style={{ fontSize: "24px", marginTop: "8px", color: "black" }}
              >
                Department arettyuiy
              </Title>
            </Space>
          </Space>
    <h1>Sorry  :(</h1> 
    <br/>
    <h1> But This is our Home Page !</h1>

</div>


</Layout>
   </LayoutNew>

      
  );
}

export default HomePage;
