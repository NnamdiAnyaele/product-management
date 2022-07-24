import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const TextFieldComponent = ({
	value,
	onChange,
	label,
	name,
	width = "100%",
	id,
	required,
	error = null,
	helperText = null,
}) => {
	// console.log({ name, error, helperText, value });
	return (
		<Box
			sx={{
				width: {
					xs: "100%",
					md: width,
				},
			}}
		>
			<TextField
				id={id}
				label={label}
				name={name}
				value={value}
				variant="outlined"
				onChange={onChange}
				fullWidth
				required={required}
				error={error}
				helperText={helperText}
			/>
		</Box>
	);
};

export default TextFieldComponent;
