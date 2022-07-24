import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const LoginTabs = ({ activeTab = "signup", onSignupClick, onLoginCLick }) => {
	return (
		<Stack direction="row" sx={{ mb: "2rem" }}>
			<Button
				variant={activeTab === "signup" ? "contained" : "text"}
				color="primary"
				sx={{ borderRadius: 0, padding: "1rem" }}
				fullWidth
				onClick={onSignupClick}
			>
				sign up
			</Button>
			<Button
				variant={activeTab === "login" ? "contained" : "text"}
				color="primary"
				sx={{ borderRadius: 0, padding: "1rem" }}
				fullWidth
				onClick={onLoginCLick}
			>
				login
			</Button>
		</Stack>
	);
};

export default LoginTabs;
