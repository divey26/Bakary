import React from "react";
import { Form, Row, Col, Input, Button } from "antd";

const ItemForm = ({ form, onFinish }) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
        <Form.Item
                name="breadname"
                label="Name"
                rules={[{ required: true, message: 'Please input the bread name!', whitespace: true }]}
              >
                <Input />
              </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input the price!', whitespace: true }]}
              >
                <Input />
              </Form.Item>

        </Col>

        <Col span={8}>
        <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!', whitespace: true }]}
              >
                <Input />
              </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ItemForm;
