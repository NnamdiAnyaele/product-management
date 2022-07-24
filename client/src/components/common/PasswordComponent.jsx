import { useState } from "react";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";

const PasswordComponent = ({
	value,
	onChange,
	error,
	helperText,
	required,
	label = "Password",
	name = "password",
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Box>
			<FormControl
				variant="outlined"
				error={error}
				required={required}
				fullWidth
			>
				<InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={onChange}
					name={name}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					label={label}
				/>
				{helperText && (
					<FormHelperText error={error}>{helperText}</FormHelperText>
				)}
			</FormControl>
		</Box>
	);
};

export default PasswordComponent;
