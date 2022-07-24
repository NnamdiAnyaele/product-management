import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextFieldComponent from "./common/TextFieldComponent";
import PasswordComponent from "./common/PasswordComponent";
import {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
} from "../utils/constants";

const validationSchema = yup.object({
	firstName: yup
		.string("Please enter your first name")
		.min(3, "First name should be of minimum 3 characters length")
		.required("First name is required"),
	lastName: yup
		.string("Please enter your last name")
		.min(3, "Last name should be of minimum 3 characters length")
		.required("Last name is required"),
	email: yup
		.string("Please enter your email")
		.email("Please enter a valid email")
		.required("Email is required"),
	phoneNumber: yup
		.string("Please enter your phone number")
		.min(10, "Phone number should be of minimum 10 characters length")
		.required("Phone number is required"),
	password: yup
		.string("Please enter your password")
		.min(7, "Password should be of minimum 7 characters length")
		.matches(
			specialCharacterCheck,
			"Password should contain at least one special character"
		)
		.matches(digitCheck, "Password should contain at least one digit")
		.matches(
			uppercaseCheck,
			"Password should contain at least one uppercase character"
		)
		.required("Password is required"),
	address: yup
		.string("Please enter your address")
		.min(3, "Address should be of minimum 3 characters length")
		.required("Address is required"),
});

const SignUp = ({ signUpFields, handleSubmit }) => {
	const formik = useFormik({
		initialValues: signUpFields,
		validationSchema,
		onSubmit: (values) => {
			handleSubmit(
				values,
				() => formik.setSubmitting(false),
				() => formik.resetForm()
			);
		},
	});

	return (
		<div>
			<Box sx={{ mb: "1rem" }}>
				<Typography
					variant="body1"
					sx={{ textAlign: "center", fontWeight: 500 }}
				>
					Create an account
				</Typography>

				<Box
					component="form"
					sx={{
						padding: "3rem",
					}}
					noValidate
					autoComplete="off"
					onSubmit={formik.handleSubmit}
				>
					<Box sx={{ mb: "2rem" }}>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.firstName}
								onChange={formik.handleChange}
								label="FirstName"
								id="firstName"
								name="firstName"
								required
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.lastName}
								onChange={formik.handleChange}
								label="LastName"
								id="lastName"
								name="lastName"
								required
								error={
									formik.touched.lastName && Boolean(formik.errors.lastName)
								}
								helperText={formik.touched.lastName && formik.errors.lastName}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.email}
								onChange={formik.handleChange}
								label="Email"
								id="email"
								name="email"
								required
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								label="Phone Number"
								id="phoneNumber"
								name="phoneNumber"
								required
								error={
									formik.touched.phoneNumber &&
									Boolean(formik.errors.phoneNumber)
								}
								helperText={
									formik.touched.phoneNumber && formik.errors.phoneNumber
								}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<PasswordComponent
								value={formik.values.password}
								onChange={formik.handleChange}
								required
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.address}
								onChange={formik.handleChange}
								label="Address"
								id="address"
								name="address"
								required
								error={formik.touched.address && Boolean(formik.errors.address)}
								helperText={formik.touched.address && formik.errors.address}
							/>
						</Box>
					</Box>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ padding: "1rem" }}
						disabled={!formik.dirty || formik.isSubmitting}
					>
						{formik.isSubmitting ? (
							<CircularProgress size="1.5rem" />
						) : (
							"create account"
						)}
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default SignUp;
