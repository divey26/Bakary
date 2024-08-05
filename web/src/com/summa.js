import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Form,
  Input,
  Space,
  Button,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  StockOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import LayoutNew from "../Layout";
import { DataGrid } from "@mui/x-data-grid";
import BreadForm from "./AddEditItems"; // Ensure this component is updated accordingly
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;
const token = localStorage.getItem("authToken");

const BreadManagementPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isAddBreadModalVisible, setIsAddBreadModalVisible] =
    useState(false);
  const [editingBread, setEditingBread] = useState(null);

  const fetchBreads = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bread');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch data.');
    }
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, data]);

  const filterData = () => {
    const filtered = data
      .map((row) => ({
        id: row._id,
        ...row,
      }))
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    setFilteredData(filtered);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addNewBread = () => {
    setIsAddBreadModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddBreadModalVisible(false);
    setEditingBread(null);
    form.resetFields();
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this bread item?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => deleteBread(id),
    });
  };

  const deleteBread = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/bread/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        message.success("Bread item deleted successfully");
        fetchBreads();
      }
    } catch (error) {
      message.error('Failed to delete bread item.');
    }
  };

  const handleEdit = (bread) => {
    setEditingBread(bread);
    setIsAddBreadModalVisible(true);
    form.setFieldsValue({
      breadname: bread.breadname,
      price: bread.price,
      description: bread.description,
    });
  };

  const columns = [
    { field: "breadname", headerName: "Bread Name", width: 200 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleEdit(params.row)}
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => confirmDelete(params.row.id)}
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    onFinishAddBread(values);
  };

  const onFinishAddBread = async (values) => {
    try {
      let response = null;
      if (editingBread) {
        response = await axios.put(
          `http://localhost:5000/api/bread/${editingBread.id}`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:5000/api/bread/`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      if (response.data.success) {
        form.resetFields();
        setIsAddBreadModalVisible(false);
        const statusText = editingBread ? "updated" : "added";
        message.success(`Bread item ${statusText} successfully`);
        fetchBreads();
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const [loggedInUserType, setLoggedInUserType] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("loggedInUserType");
    if (userType) {
      setLoggedInUserType(userType);
    }
  }, []);

  return (
    <LayoutNew userType={loggedInUserType}>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Space
            style={{
              background: "#001529",
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
                Bread Management
              </Title>
            </Space>
          </Space>
          <br />
          <br />
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={handleSearchInputChange}
              style={{ marginRight: "8px" }}
            />
            <div style={{ marginLeft: "auto", marginRight: "20px" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addNewBread}
              >
                Add New Bread
              </Button>
            </div>
          </div>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
          />
          <Modal
            open={isAddBreadModalVisible}
            title={editingBread ? "Edit Bread" : "Add New Bread"}
            okText={editingBread ? "Update" : "Save"}
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  onFinish(values);
                })
                .catch((errorInfo) => {
                  console.log("Validation Failed:", errorInfo);
                });
            }}
          >
            <BreadForm form={form} onFinish={onFinish} />
          </Modal>
        </Content>
      </Layout>
    </LayoutNew>
  );
};

export default BreadManagementPage;
