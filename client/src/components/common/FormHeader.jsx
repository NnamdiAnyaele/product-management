import Box from "@mui/material/Box";
import logo from "../../assets/logos/trade-depot-logo.png";

const FormHeader = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				mb: { md: "2rem", xs: "1rem" },
			}}
		>
			<img
				src={logo}
				alt="Smart Deals"
				style={{ objectFit: "cover", width: "12.5rem", height: "auto" }}
			/>
		</Box>
	);
};

export default FormHeader;
