import React, { useMemo, useState } from "react";
import {
    useCreateDataMutation,
    useDeleteDataMutation,
    useGetDataQuery,
    useUpdateDataMutation,
} from "./api";
import {
    Button,
    Space,
    Table,
    Drawer,
    Row,
    Col,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Typography,
    Divider,
    notification,
    DatePicker,
} from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { TData } from "./types";
import Link from "antd/es/typography/Link";
import { Box } from "@chakra-ui/react";
import {
    appName,
    featureType,
    defaultData,
    tableColumns,
    formInputs,
    isParent,
} from "./config";

import Sidebar from "../../components/Sidebar";
import {
    CheckOutlined,
    CloseOutlined,
    DashboardOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import type { DatePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";

const Context = React.createContext({ name: "Default" });

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: TData;
    index: number;
    children: React.ReactNode;
    handleDatePickerChange: () => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    handleDatePickerChange,
    ...restProps
}) => {
    console.log([children as any][0][1]);
    const inputNode =
        String(inputType) === "date" ? (
            <Input type="datetime-local" />
        ) : (
            <Input />
        );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                <>
                    {String(inputType) === "date"
                        ? `${new Date(
                              [children as any][0][1]
                          ).toLocaleString()}`
                        : children}
                </>
            )}
        </td>
    );
};

interface Props {
    handleRedirect: (id: string) => void;
}

const DataTable = ({ handleRedirect }: Props) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetDataQuery(null);

    const [createData] = useCreateDataMutation();
    const [updateData, { isLoading: isUpdating }] = useUpdateDataMutation();
    const [deleteData] = useDeleteDataMutation();

    const [open, setOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(defaultData);
    const [dataArray, setDataArray] = useState<TData[]>([]);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");

    const [api, contextHolder] = notification.useNotification();

    const errorNotification = (placement: NotificationPlacement) => {
        console.log(error);
        api.error({
            message: `Error!`,
            description: (
                <Context.Consumer>
                    {({ name }) => `Something went wrong!`}
                </Context.Consumer>
            ),
            placement,
        });
    };

    const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

    const isEditing = (record: TData) => {
        return record._id === editingKey;
    };

    const edit = (record: Partial<TData> & { key: React.Key }) => {
        console.log(record.date);
        form.setFieldsValue({
            ...defaultData,
            date: dayjs(record.date),
            owner: localStorage.getItem("userId"),
            ...record,
        });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as TData;
            console.log(row);
            const newData = [...data];
            const index = newData.findIndex((item) => editingKey === item._id);
            console.log(index);
            if (index > -1) {
                const item = newData[index];
                const saveItem = { ...item, ...row };
                newData.splice(index, 1, saveItem);
                setDataArray(newData);
                updateData(saveItem);
                setEditingKey("");
            } else {
                newData.push(row);
                setDataArray(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const openCreateDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
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

    const handleDatePickerChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value, name } = event.target;
        console.log(dayjs(value).toISOString());
        const date = new Date(dayjs(value).toISOString());
        console.log(date.toISOString());
        setCurrentRecord({
            ...currentRecord,
            date: date.toISOString().slice(0, 16),
        });
    };

    const columns = [
        ...tableColumns,
        {
            title: "Action",
            key: "action",
            render: (_: any, record: TData) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record._id)}
                            style={{ marginRight: 8 }}
                        >
                            <CheckOutlined />
                        </Typography.Link>
                        <Typography.Link
                            onClick={cancel}
                            style={{ marginRight: 8 }}
                            type="danger"
                        >
                            <CloseOutlined />
                        </Typography.Link>
                    </span>
                ) : (
                    <Space size="middle">
                        {isParent ? (
                            <Typography.Link
                                disabled={editingKey !== ""}
                                onClick={() => handleRedirect(record._id)}
                            >
                                <DashboardOutlined />
                            </Typography.Link>
                        ) : null}
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                        >
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record._id)}
                        >
                            <Link type="danger">
                                <DeleteOutlined />
                            </Link>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
            console.log(col);
            return col;
        }
        return {
            ...col,
            onCell: (record: TData) => ({
                record,
                inputType: col.dataIndex === "date" ? "date" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                handleDatePickerChange,
            }),
        };
    });

    if (isError) errorNotification("topLeft");

    return (
        <>
            <Context.Provider value={contextValue}>
                {contextHolder}
            </Context.Provider>
            <Box mb={2}>
                <Button type="primary" onClick={openCreateDrawer}>
                    Create
                </Button>
            </Box>
            <Form form={form} component={false}>
                <Table
                    rowKey="_id"
                    dataSource={data}
                    columns={mergedColumns}
                    size="small"
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    loading={isLoading || isUpdating}
                />
            </Form>
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
                        {formInputs.map((input, index) => {
                            return (
                                <Form.Item
                                    key={index}
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
                                    {input.type === "text" ? (
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
                                    ) : null}
                                    {input.type === "date" ? (
                                        // <DatePicker
                                        //     showTime
                                        //     onChange={handleDatePickerChange}
                                        // />
                                        <Input
                                            type="datetime-local"
                                            onChange={handleDatePickerChange}
                                            value={
                                                (currentRecord as any)[
                                                    input.name
                                                ] || ""
                                            }
                                        />
                                    ) : null}
                                </Form.Item>
                            );
                        })}
                    </Form>
                </div>
            </Drawer>
        </>
    );
};

export default DataTable;
