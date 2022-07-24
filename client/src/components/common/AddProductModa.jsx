import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import closeIcon from "../../assets/icons/close-icon.svg";
import NumberTextField from "./NumberTextField";
import TextTextField from "./TextFieldComponent";
import logo from "../../assets/logos/trade-depot-logo.png";

export default function ResponsiveDialog({
	open,
	handleClose,
	title,
	subtitle,
	editData,
	setEditData,
	loading,
	handleSubmit,
	isEdit,
}) {
	const handleChange = (e) => {
		const { name, value } = e.target;
		const fieldsToSet = { ...editData };
		fieldsToSet[name] = value;
		setEditData(fieldsToSet);
	};

	const handleImageChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (file.size > 2000000) {
			toast.error("file is too large");
			return;
		}
		if (
			file.type !== "image/jpg" &&
			file.type !== "image/png" &&
			file.type !== "image/jpeg"
		) {
			toast.error("Image must be of format jpg, png, jpeg");
			return;
		}
		setEditData({ ...editData, image: file, imageName: file.name });
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				sx={{
					borderRadius: "50px",
					"& .MuiDialog-paper": {
						borderRadius: "50px",
					},
				}}
			>
				<DialogTitle id="responsive-dialog-title">
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="text"
							sx={{ height: "3rem", width: "3rem" }}
							onClick={handleClose}
							endIcon={
								<img
									src={closeIcon}
									height="100%"
									width="100%"
									alt="close modal"
								/>
							}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box sx={{ width: "auto", height: "5.25rem" }}>
							<img
								src={logo}
								height="100%"
								width="100%"
								alt="Cardinalstone logo"
							/>
						</Box>
						<Typography
							variant="h6"
							component="div"
							sx={{ color: "#002564", fontWeight: 700 }}
						>
							{title}
						</Typography>
						<Typography
							variant="h6"
							gutterBottom
							component="div"
							sx={{ color: "primary.main", fontWeight: 700 }}
						>
							{subtitle}
						</Typography>
					</Box>
				</DialogTitle>
				<DialogContent
					sx={{
						textAlign: "center",
						overflowX: "hidden",
					}}
				>
					<Box
						component="form"
						sx={{
							padding: "1rem",
							width: "26rem",
						}}
						noValidate
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								mb: { md: "1rem", xs: 0 },
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: { md: "row", xs: "column" },
									mb: "1rem",
									width: "100%",
								}}
							>
								<Box
									sx={{
										width: "100%",
										mb: { md: 0, xs: "1rem" },
									}}
								>
									<TextTextField
										id="name"
										label="Product Name"
										name="name"
										value={editData.name}
										onChange={handleChange}
									/>
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: { md: "row", xs: "column" },
									mb: "1rem",
									width: "100%",
								}}
							>
								<Box
									sx={{
										width: "100%",
										mb: { md: 0, xs: "1rem" },
									}}
								>
									<TextTextField
										id="price"
										label="Product price"
										name="price"
										value={editData.price}
										onChange={handleChange}
									/>
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: { md: "row", xs: "column" },
									mb: "1rem",
									width: "100%",
								}}
							>
								<Box
									sx={{
										width: "100%",
										mb: { md: 0, xs: "1rem" },
									}}
								>
									<TextTextField
										id="description"
										label="Product description"
										name="description"
										value={editData.description}
										onChange={handleChange}
									/>
								</Box>
							</Box>

							{!isEdit && (
								<TextField
									id="investment-notification-image"
									label={editData.imageName || "Product Image"}
									variant="outlined"
									type="file"
									helperText="jpg, png, jpeg (max 2mb)"
									onChange={handleImageChange}
									sx={{
										input: {
											opacity: 0,
										},
									}}
									InputLabelProps={{
										shrink: false,
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="start">
												<FileUploadOutlinedIcon />
											</InputAdornment>
										),
									}}
								/>
							)}
							<Box
								sx={{
									display: "flex",
									flexDirection: { md: "row", xs: "column" },
									mb: "1rem",
									width: "100%",
								}}
							>
								<Box sx={{ width: { md: "100%", xs: "100%" } }}>
									<TextTextField
										id="address"
										label="Address"
										name="address"
										value={editData.address}
										onChange={handleChange}
									/>
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: { md: "row", xs: "column" },
									mb: "1rem",
									width: "100%",
								}}
							>
								<Box sx={{ width: { xs: "100%" } }}>
									<NumberTextField
										id="radius"
										label="radius (km)"
										name="radius"
										value={editData.radius}
										onChange={handleChange}
									/>
								</Box>
							</Box>
						</Box>
						<Stack
							direction="row"
							spacing={2}
							sx={{
								marginTop: "1rem",
								marginBottom: "1rem",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Button
								sx={{
									paddingLeft: "2rem",
									paddingRight: "2rem",
								}}
								variant="contained"
								type="submit"
							>
								{loading ? (
									<CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
								) : isEdit ? (
									"update"
								) : (
									"create"
								)}
							</Button>
							<Button
								sx={{
									paddingLeft: "2rem",
									paddingRight: "2rem",
									backgroundColor: "#528DC2",
								}}
								variant="contained"
								onClick={handleClose}
							>
								close
							</Button>
						</Stack>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
