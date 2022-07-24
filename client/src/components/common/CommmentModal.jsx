import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import closeIcon from "../../assets/icons/close-icon.svg";
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
}) {
	const [charCount, setCharCount] = useState(0);
	const [charError, setCharError] = useState(false);

	const handleChange = (e) => {
		const text = e.target.value;
		const charLength = text.length;
		if (charLength <= 100) {
			setCharCount(charLength);
			setEditData(text);
			setCharError(false);
			return;
		}
		setCharError(true);
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
									<TextField
										id="comment"
										label="Product Comment"
										name="comment"
										value={editData}
										onChange={handleChange}
										multiline
										rows={4}
										fullWidth
										helperText={`Remaining characters ${100 - charCount}`}
										error={charError}
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
								) : (
									"comment"
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
