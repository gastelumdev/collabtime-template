import { Box } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import Cards from "./Cards";
import { appName, isParent, redirectFeature, presentationType } from "./config";
import { links } from "../../config";
import DataTable from "./DataTable";
import { Breadcrumb } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const breadcrumbNameMap: Record<string, string> = links;

export function View() {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {}, [redirect]);

    // BREADCRUMB FUNCTIONALITY *******************************************
    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });
    // END BREADCRUMB FUNCTIONALITY ****************************************

    // REDIRECT FUCTIONALITY ***********************************************
    const handleRedirect = (id: string) => {
        console.log("Handle redirect executed");
        localStorage.setItem(`${appName.slice(0, -1)}Id`, id);
        setRedirect(true);
    };

    if (
        isParent &&
        redirect &&
        localStorage.getItem(`${appName.slice(0, -1)}Id`)
    ) {
        return (
            <Navigate
                to={`/${appName}/${localStorage.getItem(
                    `${appName.slice(0, -1)}Id`
                )}/${redirectFeature}`}
            />
        );
    }
    return (
        <>
            <Sidebar>
                <Box mb={6} ml={3}>
                    <Breadcrumb items={breadcrumbItems}></Breadcrumb>
                </Box>
                {(presentationType as string) === "datatable" ? (
                    <DataTable handleRedirect={handleRedirect} />
                ) : (
                    <></>
                )}
                {(presentationType as string) === "cards" ? <Cards /> : <></>}
            </Sidebar>
        </>
    );
}
