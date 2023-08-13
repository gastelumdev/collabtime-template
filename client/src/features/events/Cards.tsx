import React, { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Skeleton,
    Space,
    Breadcrumb,
} from "antd";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import "./styles.css";
import {
    useCreateDataMutation,
    useDeleteDataMutation,
    useGetDataQuery,
    useUpdateDataMutation,
} from "./api";
import { TData } from "./types";
import {
    DashboardOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { appName, formInputs, defaultData } from "./config";
import { Link, useLocation } from "react-router-dom";

const Cards = () => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetDataQuery(null);
    const [createData] = useCreateDataMutation();
    const [updateData, { isLoading: isUpdating }] = useUpdateDataMutation();
    const [deleteData] = useDeleteDataMutation();

    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(defaultData);
    const [form] = Form.useForm();

    const openCreateDrawer = () => {
        setOpen(true);
    };

    const openUpdateDrawer = (record: TData) => {
        setUpdateOpen(true);
        setCurrentRecord(record as any);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onCloseUpdate = () => {
        setUpdateOpen(false);
    };

    const handleSave = async () => {
        await createData({
            ...currentRecord,
            owner: localStorage.getItem("userId"),
        }).unwrap();
        setOpen(false);
        form.resetFields();
        setCurrentRecord(defaultData);
    };

    const handleUpdateSave = async () => {
        await updateData({
            ...currentRecord,
            owner: localStorage.getItem("userId"),
        }).unwrap();
        setUpdateOpen(false);
        form.resetFields();
        setCurrentRecord(defaultData);
    };

    const handleDelete = async (id: string) => {
        await deleteData(id);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setCurrentRecord({
            ...currentRecord,
            [name]: value,
        });
    };

    if (isLoading) return <h1>Is Loading</h1>;

    return (
        <>
            <Box mb={2} ml={3}>
                <Button type="primary" onClick={openCreateDrawer}>
                    Create
                </Button>
            </Box>
            <SimpleGrid minChildWidth={"200px"}>
                {data.map((record: TData, index: any) => {
                    return (
                        <Card
                            key={index}
                            size="small"
                            bordered={false}
                            title={`${record.name}`}
                            loading={isLoading || isUpdating}
                            style={{ maxWidth: "300px", margin: "10px" }}
                            actions={[
                                <EditOutlined
                                    key="edit"
                                    onClick={() => openUpdateDrawer(record)}
                                />,
                                <DeleteOutlined
                                    key="delete"
                                    onClick={() => handleDelete(record._id)}
                                />,
                                <DashboardOutlined key="dashboard" />,
                            ]}
                        >
                            <p className="card-description">
                                {record.description}
                            </p>
                            <p className="card-subdescription">
                                {new Date(
                                    record.date as string
                                ).toLocaleString()}
                            </p>
                        </Card>
                    );
                })}
            </SimpleGrid>
            <Drawer
                title={`Create ${
                    appName.charAt(0).toUpperCase() + appName.slice(1)
                }`}
                placement={"right"}
                width={500}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Space>
                }
            >
                <div>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        style={{ maxWidth: 1200 }}
                    >
                        {formInputs.map((input) => {
                            return (
                                <Form.Item
                                    label={
                                        input.name.charAt(0).toUpperCase() +
                                        input.name.slice(1)
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: `Please enter ${input.name}`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={`Please enter ${input.name}`}
                                        onChange={handleChange}
                                        name={input.name}
                                        value={
                                            (currentRecord as any)[
                                                input.name
                                            ] || ""
                                        }
                                    />
                                </Form.Item>
                            );
                        })}
                    </Form>
                </div>
            </Drawer>
            <Drawer
                title={`Update ${
                    appName.charAt(0).toUpperCase() + appName.slice(1)
                }`}
                placement={"right"}
                width={500}
                onClose={onCloseUpdate}
                open={updateOpen}
                extra={
                    <Space>
                        <Button onClick={onCloseUpdate}>Cancel</Button>
                        <Button type="primary" onClick={handleUpdateSave}>
                            Save
                        </Button>
                    </Space>
                }
            >
                <div>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        style={{ maxWidth: 1200 }}
                    >
                        {formInputs.map((input) => {
                            return (
                                <Form.Item
                                    label={
                                        input.name.charAt(0).toUpperCase() +
                                        input.name.slice(1)
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: `Please enter ${input.name}`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={`Please enter ${input.name}`}
                                        onChange={handleChange}
                                        name={input.name}
                                        value={
                                            (currentRecord as any)[
                                                input.name
                                            ] || ""
                                        }
                                    />
                                </Form.Item>
                            );
                        })}
                    </Form>
                </div>
            </Drawer>
        </>
    );
};

export default Cards;
