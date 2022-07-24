import { useState } from "react";
import { toast } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import LoginTabs from "../../components/common/LoginTabs";
import SignUp from "../../components/SignUp";
import LoginComponent from "../../components/Login";
import FormHeader from "../../components/common/FormHeader";
import { login, signup } from "../../api/auth";
import { getCoordinates } from "../../api/requests";

const defaultSignUpFields = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	password: "",
	address: "",
};

const defaultLoginFields = {
	email: "",
	password: "",
};

const SIGNUPTABS = {
	LOGIN: "login",
	SIGNUP: "signup",
};

const Login = () => {
	const [tab, setTab] = useState(SIGNUPTABS.LOGIN);

	const handleSignUpSubmit = async (values, stopSubmitLoading, resetForm) => {
		try {
			const response = await getCoordinates(values.address);
			if (!response.results[0].geometry) {
				throw new Error("Invalid address");
			}
			const geoCords = response.results[0].geometry;
			const payload = {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				phoneNumber: values.phoneNumber,
				password: values.password,
				address: values.address,
				location: {
					type: "Point",
					coordinates: [geoCords.lng, geoCords.lat],
				},
			};
			const result = await signup(payload);
			stopSubmitLoading();
			resetForm();
			toast.success(result.message);
		} catch (error) {
			stopSubmitLoading();
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	const handleLoginSubmit = async (values, stopSubmitLoading, resetForm) => {
		try {
			const payload = {
				email: values.email.trim(),
				password: values.password.trim(),
			};
			const result = await login(payload);
			localStorage.setItem("token", result.data?.token);
			localStorage.setItem("user", JSON.stringify(result.data?.data));
			stopSubmitLoading();
			resetForm();
			toast.success(result.message);
			window.location = "/dashboard";
		} catch (error) {
			stopSubmitLoading();
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	return (
		<div>
			<CssBaseline />
			<Box
				sx={{
					minHeight: "100vh",
					backgroundColor: "#fff",
					width: "100vw",
					position: "relative",
				}}
			>
				<Box
					sx={{
						padding: { md: "2rem", sm: "1rem", xs: 0 },
					}}
				>
					<FormHeader />
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Box
							sx={{
								width: "33rem",
								border: "1px solid #E6E6E6",
								borderRadius: "4px",
							}}
						>
							<LoginTabs
								activeTab={tab}
								onSignupClick={() => setTab(SIGNUPTABS.SIGNUP)}
								onLoginCLick={() => setTab(SIGNUPTABS.LOGIN)}
							/>
							{tab === SIGNUPTABS.LOGIN && (
								<LoginComponent
									loginFields={defaultLoginFields}
									handleSubmit={handleLoginSubmit}
								/>
							)}
							{tab === SIGNUPTABS.SIGNUP && (
								<SignUp
									signUpFields={defaultSignUpFields}
									handleSubmit={handleSignUpSubmit}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default Login;
