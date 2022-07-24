import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

const SelectFieldComponent = ({
	values,
	value,
	onChange,
	label,
	id,
	width,
	name,
	required,
	menuValue,
	displayValue,
	error = null,
	helperText = null,
}) => {
	return (
		<Box
			sx={{
				width: {
					xs: "100%",
					md: width,
				},
			}}
		>
			<FormControl fullWidth required={required} error={error}>
				<InputLabel id={`${id}-label`}>{label}</InputLabel>
				<Select
					labelId={`${id}-label`}
					id={id}
					name={name}
					value={value}
					label={label}
					onChange={onChange}
					sx={{ textTransform: "capitalize" }}
				>
					{values.map((item, index) => (
						<MenuItem
							value={menuValue ? item[menuValue] : item}
							key={item.id || item.ID || index}
							sx={{ textTransform: "capitalize" }}
						>
							{displayValue ? item[displayValue] : item}
						</MenuItem>
					))}
				</Select>
				{helperText && (
					<FormHelperText error={error}>{helperText}</FormHelperText>
				)}
			</FormControl>
		</Box>
	);
};

export default SelectFieldComponent;
