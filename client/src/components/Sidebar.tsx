import React from "react";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { links, linkIcons } from "../config";
import { icons } from "../utils/icon";
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const breadcrumbNameMap: Record<string, string> = links;

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const Sidebar = ({ children }: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
            icon: linkIcons[index],
        };
    });

    console.log(breadcrumbItems);

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
                style={{
                    // overflow: "auto",
                    height: "100vh",
                    paddingTop: "0px",
                    // position: "fixed",
                    // left: 0,
                    // top: 0,
                    // bottom: 0,
                }}
                width={220}
            >
                {React.createElement(UserOutlined)}
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    // items={breadcrumbItems.map((item: any, index) => ({
                    //     key: String(index + 1),
                    //     icon: React.createElement(icons["BorderOutlined"]),
                    //     label: `${item.title}`,
                    // }))}
                >
                    {breadcrumbItems.map((item: any, index) => {
                        const icon = item.icon;
                        return (
                            <Menu.Item
                                key={index + 1}
                                icon={React.createElement(
                                    icons[item.icon as keyof any]
                                )}
                            >
                                <Link to={item.key}>
                                    {breadcrumbNameMap[item.key]}
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>
            <Layout>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content style={{ margin: "24px 0px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            maxWidth: 1200,
                            // background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Collabtime</Footer>
            </Layout>
        </Layout>
    );
};

export default Sidebar;
