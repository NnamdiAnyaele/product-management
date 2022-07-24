import React from "react";
import { styled } from "@mui/material/styles";

const Drawer = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const DrawerHeader = ({ children }) => {
	return <Drawer>{children}</Drawer>;
};

export default DrawerHeader;
