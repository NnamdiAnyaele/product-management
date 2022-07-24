import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DrawerHeader from "../../components/common/DrawerHeader";
import AuthContext from "../../contexts/AuthContext";
import logo from "../../assets/logos/trade-depot-logo.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	backgroundColor: "#fff",
	color: "#304254",
	...(!open && {
		paddingLeft: `calc(${theme.spacing(7)} + 1px)`,
		[theme.breakpoints.up("sm")]: {
			paddingLeft: `calc(${theme.spacing(9)} + 1px)`,
		},
	}),
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": { ...openedMixin(theme), overflow: "visible" },
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": { ...closedMixin(theme), overflow: "visible" },
	}),
}));

const drawerPaperStyles = (theme) => ({
	backgroundColor: "#002564",
	color: "#91A4B7",
});

// const HeaderImage = styled("img")({
// 	height: "2.5rem",
// 	width: "2.5rem",
// 	borderRadius: "50%",
// });

const Logo = styled("img")({
	maxHeight: "80%",
	maxWidth: "80%",
});

const sideBarItemActiveStyles = {
	color: "#fff",
	backgroundColor: "#002564",
	borderLeft: "0.4rem solid #ffffff",
	width: "100%",
	marginLeft: "2rem",
	borderRadius: "0px 20px 20px 0px",
};

const sideBarItemStyles = {
	color: "rgba(117, 117, 158, 0.6)",
	fontWeight: 700,
	borderRadius: "0.5rem",
	alignSelf: "center",
	width: "90%",
	marginBottom: "1rem",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
	"&:hover": { ...sideBarItemActiveStyles },
};

const sidebarIconActiveStyles = {
	color: "#fff",
};

const sideBarIconStyles = {
	color: "rgba(117, 117, 158, 0.6)",
	"&:hover": { ...sidebarIconActiveStyles },
};

const logoutActiveStyles = {
	backgroundColor: "#F8F8FA",
};

const logoutStyles = {
	color: "#aa4848",
	fontWeight: 700,
	borderRadius: "0.5rem",
	alignSelf: "center",
	width: "90%",
	marginBottom: "1rem",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
	backgroundColor: "#c4c4c4",
	"&:hover": { ...logoutActiveStyles },
};

const logoutIconStyles = {
	color: "#aa4848",
};

const Layout = () => {
	const [open, setOpen] = useState(true);
	const [value, setValue] = useState(0);
	const [homeActive, setHomeActive] = useState(false);
	const [myProductsActive, setMyProductsActive] = useState(false);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const location = useLocation();

	const { user } = useContext(AuthContext);

	useEffect(() => {
		function handleResize() {
			setInnerWidth(window.innerWidth);
			if (innerWidth < 960) {
				setOpen(false);
			} else {
				setOpen(true);
			}
		}

		window.addEventListener("resize", handleResize);
		return () => {
			window.addEventListener("resize", handleResize);
		};
	});

	useEffect(() => {
		if (innerWidth < 960) {
			setOpen(false);
		}
	}, [innerWidth]);

	useEffect(() => {
		if (location.pathname === "/dashboard" && value !== 0) {
			setValue(0);
		}
		if (location.pathname.includes("/my-products") && value !== 1) {
			setValue(1);
		}
	}, [value, location.pathname]);

	return (
		<>
			<AppBar
				position="fixed"
				open={open}
				sx={{
					paddingRight: "0 !important",
					"& .MuiPaper-root": {
						paddingRight: "0 !important",
					},
				}}
			>
				<Toolbar
					sx={{
						paddingRight: 0,
						"& .MuiPaper-root": {
							paddingRight: 0,
						},
					}}
				>
					<Box sx={{ display: "flex" }}>
						<Button component={Link} to="/dashboard" sx={{ color: "#002564" }}>
							<HomeIcon /> <ArrowForwardIosIcon sx={{ fontSize: "0.8rem" }} />
						</Button>

						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{
								display: {
									md: "block",
									xs: "none",
								},
							}}
						>
							<span role="img" aria-label="hand wave">
								👋{" "}
							</span>
							Hello {user?.firstName || ""}
						</Typography>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{
							display: {
								xs: "flex",
								sm: "flex",
								md: "flex",
							},
							marginRight: "3rem",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginRight: "1rem",
							}}
						>
							<Typography
								variant="subtitle1"
								sx={{ fontWeight: 700, color: "#0D1829" }}
								component="div"
							>
								{user?.fullName}
							</Typography>
						</div>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					"& .MuiDrawer-paper": drawerPaperStyles,
				}}
			>
				<DrawerHeader>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Logo src={logo} alt="cardinal stone logo" />
					</Box>
					<IconButton
						sx={{
							color: "#91A4B7",
							"&:hover": {
								color: "#fff",
								backgroundColor: "#75759E",
							},
						}}
						onClick={() => setOpen(!open)}
					>
						{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider
					sx={{
						backgroundColor: "#75759E",
					}}
				/>
				<List
					sx={{
						display: "flex",
						flexDirection: "column",
						paddingTop: "2rem",
					}}
				>
					<ListItem
						button
						component={Link}
						to="/dashboard"
						sx={{
							...sideBarItemStyles,
							...(value === 0 && sideBarItemActiveStyles),
						}}
						onClick={() => setValue(0)}
						onMouseEnter={() => setHomeActive(true)}
						onMouseLeave={() => setHomeActive(false)}
					>
						<ListItemIcon
							sx={{
								...sideBarIconStyles,
								...(value === 0 && sidebarIconActiveStyles),
								...(homeActive && sidebarIconActiveStyles),
							}}
						>
							<HomeOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							primary="Dashboard"
							disableTypography
							sx={{ fontWeight: 700, display: `${!open && "none"}` }}
						/>
					</ListItem>
					<ListItem
						button
						component={Link}
						to="/my-products"
						sx={{
							...sideBarItemStyles,
							...(value === 1 && sideBarItemActiveStyles),
						}}
						onClick={() => setValue(0)}
						onMouseEnter={() => setMyProductsActive(true)}
						onMouseLeave={() => setMyProductsActive(false)}
					>
						<ListItemIcon
							sx={{
								...sideBarIconStyles,
								...(value === 1 && sidebarIconActiveStyles),
								...(myProductsActive && sidebarIconActiveStyles),
							}}
						>
							<ShoppingCartIcon />
						</ListItemIcon>
						<ListItemText
							primary="My Products"
							disableTypography
							sx={{ fontWeight: 700, display: `${!open && "none"}` }}
						/>
					</ListItem>
				</List>

				<Box
					sx={{
						mt: "auto",
						mb: "auto",
					}}
				>
					<List sx={{ display: "flex", flexDirection: "column" }}>
						<ListItem
							button
							component={Link}
							to="/logout"
							sx={{ ...logoutStyles }}
						>
							<ListItemIcon
								sx={{
									...logoutIconStyles,
								}}
							>
								<LogoutOutlinedIcon />
							</ListItemIcon>
							<ListItemText
								disableTypography
								sx={{ fontWeight: 700, display: `${!open && "none"}` }}
								primary="Logout"
							/>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default Layout;
