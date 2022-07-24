import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const customTheme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#E27D06",
			dark: "#975404",
			light: "#f99622",
		},
		secondary: {
			light: "#2285f9",
			main: "#066BE2",
			dark: "#044897",
		},
		error: {
			main: red[800],
		},
	},
	status: {
		danger: red[500],
	},
});

export default customTheme;
