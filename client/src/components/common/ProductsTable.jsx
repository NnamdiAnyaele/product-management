import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { numberFormatter } from "../../utils/helpers";

export default function StickyHeadTable({
	loading,
	data,
	setSelectedItem,
	handleDelete,
	handleEdit,
}) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const firstPageElement = page * rowsPerPage + 1;

	useEffect(() => {
		if (firstPageElement > data?.length) {
			setPage(0);
		}
	}, [data, firstPageElement]);

	const columns = [
		{ id: "S/N", label: "S/N", minWidth: 10 },
		{ id: "productName", label: "Product Name", minWidth: 120 },
		{ id: "description", label: "Description", minWidth: 80 },
		{ id: "productImage", label: "Product Image", minWidth: 80 },
		{ id: "retailPrice", label: "Retail Price", minWidth: 80 },
		{ id: "address", label: "Address", minWidth: 80 },
		{ id: "availablityRadius", label: "Availablity Radius (km)", minWidth: 80 },
		{ id: "comments", label: "Comments", minWidth: 180 },
		{ id: "action", label: "", minWidth: 50 },
	];

	return (
		<Paper
			sx={{
				width: "100%",
				overflow: "hidden",
				marginBottom: "3rem",
			}}
		>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									sx={{
										backgroundColor: "primary.main",
										color: "#fff",
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{!loading &&
							data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((item, index) => (
									<TableRow key={item.id} hover role="checkbox" tabIndex={-1}>
										<TableCell>{page * rowsPerPage + index + 1}</TableCell>
										<TableCell>{item.name || ""}</TableCell>
										<TableCell>{item.description || ""}</TableCell>
										<TableCell>
											<Box sx={{ height: "3rem", width: "3rem" }}>
												<img
													src={item.imageUrl?.split("/public/")[1]}
													alt={item.name}
													height="100%"
													width="100%"
												/>
											</Box>
										</TableCell>
										<TableCell>{numberFormatter(item.price) || ""}</TableCell>
										<TableCell>{item.address || ""}</TableCell>
										<TableCell>{numberFormatter(item.radius) || ""}</TableCell>
										<TableCell>
											{item.comments.map((comment, index) => (
												<li key={index}>{`${comment?.comment || ""}`}</li>
											)) || ""}
										</TableCell>
										<TableCell>
											<IconButton
												onClick={(event) => {
													setSelectedItem(item);
													handleClick(event);
												}}
											>
												<MoreHorizIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
					</TableBody>
				</Table>
			</TableContainer>
			{loading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
						marginTop: "2rem",
					}}
				>
					<CircularProgress size="2rem" />
				</Box>
			)}
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={data.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<Menu
				id="handle-activate-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "handle-activate-button",
				}}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						handleEdit();
					}}
				>
					<EditIcon sx={{ mr: "0.5rem", fontSize: "1rem" }} />
					<Typography variant="body2">Edit</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleDelete();
						handleClose();
					}}
					sx={{ color: "#f00" }}
				>
					<DeleteForeverIcon sx={{ mr: "0.5rem", fontSize: "1rem" }} />
					<Typography variant="body2">Delete</Typography>
				</MenuItem>
			</Menu>
		</Paper>
	);
}
