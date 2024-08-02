import { Layout, Row, Card as AntCard, Col } from 'antd';
import LayoutNew from '../../Layout';
import styled from 'styled-components';
import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import videoSrc from '../../video.mp4';

// Import images from the specified directory
import backgroundImage from '../../p1.jpg'; // Replace this with the actual background image path

const { Meta } = AntCard;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <LayoutNew>
      <Layout>
        <BackgroundContainer>
          <ContentWrapper>
            <h1 style={{fontSize:"50px",marginTop:"10px"}}>Welcome to Sweet Street Bakery</h1>
            <p style={{fontSize:"17px",marginTop:"1px",marginLeft:"10px"}}>
              At Sweet Street Bakery, we believe that every bite should be a delightful experience. Our passion for baking shines through in each and every treat we create, from our freshly baked bread to our decadent cakes and pastries. Whether you're stopping by for a quick snack or planning a special occasion, we have something to satisfy every craving.
            </p>
          </ContentWrapper>
        </BackgroundContainer>

        <ContentSection>
          <StyledRow gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp12749476.jpg" />}
                onClick={() => navigate('/bread')}
              >
                <Meta title="Bread" description="www.instagram.com" />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp2378609.jpg" />}
                onClick={() => navigate('/croissants')}

              >
                <Meta title="Croissants" description="www.instagram.com" />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp3055487.jpg" />}
                onClick={() => navigate('/cookies')}

              >
                <Meta title="Cookies" description="www.instagram.com" />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp12766510.jpg" />}
                onClick={() => navigate('/buns')}

              >
                <Meta title="Buns" description="www.instagram.com" />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp2053450.jpg" />}
                onClick={() => navigate('/sandwiches')}

              >
                <Meta title="Sandwiches" description="www.instagram.com" />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp2954058.jpg" />}
                onClick={() => navigate('/cakes')}

             >
                <Meta title="Cakes" description="www.instagram.com" />
              </StyledCard>
            </Col>
          </StyledRow>
        </ContentSection>

        <VideoContainer>
          <ReactPlayer
            url={videoSrc}
            width="100%"
            height="auto"
            controls
          />
        </VideoContainer>
      </Layout>
    </LayoutNew>
  );
};

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 60vh;
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
  margin-top: 50px;
  max-width: 90%;
  width:100%; /* Ensure this is not too wide for mobile */
`;

const ContentSection = styled.div`
  background-color: #FFEBD4;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const StyledCard = styled(AntCard)`
  background-color: #A0937D; /* Change this color to your desired card background color */
  .ant-card-meta-title {
    color: #000000; /* Change this color to your desired title color */
  }
  .ant-card-meta-description {
    color: #000000; /* Change this color to your desired description color */
  }
  .ant-card-cover img {
    border-radius: 5px; /* Adjust this value to curve the edges more or less */
  }
`;

const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

export default HomePage;
