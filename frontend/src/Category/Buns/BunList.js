import React, { useEffect, useState } from 'react';
import { Card as AntCard, Row, Col, Button as AntButton } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const { Meta } = AntCard;

const BunList = () => {
  const [buns, setBuns] = useState([]);

  useEffect(() => {
    const fetchBuns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/buns');
        setBuns(response.data);
      } catch (error) {
        console.error('Error fetching buns:', error);
      }
    };

    fetchBuns();
  }, []);

  return (
    <ContentSection>
      <StyledRow gutter={[16, 16]}>
        {buns.map((bun) => (
          <Col key={bun._id} xs={24} sm={12} md={8}>
            <StyledCard
              hoverable
              cover={<StyledImage alt={bun.breadname} src={bun.imageURL} />}
            >
              <Meta
                title={bun.breadname}
                description={
                  <DescriptionWrapper>
                    <div>Price: Rs.{bun.price}</div>
                    <div>{bun.description}</div>
                  </DescriptionWrapper>
                }
              />
              <StyledButton>Add to Cart</StyledButton>
            </StyledCard>
          </Col>
        ))}
      </StyledRow>
    </ContentSection>
  );
};

const ContentSection = styled.div`
  background-color: #FFEBD4;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
`;

const StyledCard = styled(AntCard)`
  background-color: #A0937D;
  width: 400px; /* Set a fixed width for the card */
  height: 420px; /* Set a fixed height for the card */
  
  .ant-card-meta-title {
    color: #000000;
    text-align: left; /* Align title to the left */
  }
  .ant-card-meta-description {
    color: #000000;
    text-align: left; /* Align description to the left */
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px; /* Adjust the height of the image as needed */
  object-fit: cover; /* Ensures the image covers the area without distortion */
`;

const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

const DescriptionWrapper = styled.div`
  white-space: pre-line; /* Ensures line breaks are respected */
  text-align: left; /* Align description to the left */
`;

const StyledButton = styled(AntButton)`
  background-color: #FFC107; /* Button background color */
  color: #000; /* Button text color */
  border: none; /* Remove button border */
  margin-top: 10px; /* Space above the button */
  
  &:hover {
    background-color: #FFA000; /* Button background color on hover */
    color: #FFF; /* Button text color on hover */
  }
`;

export default BunList;
