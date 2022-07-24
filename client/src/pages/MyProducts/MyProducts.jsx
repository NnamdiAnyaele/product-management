import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Table from "../../components/common/ProductsTable";
import SuccessModal from "../../components/common/SuccessModal";
import Layout from "../../components/common/Layout";
import CreateProductModal from "../../components/common/AddProductModa";
import {
	fetchProducts,
	deleteProduct,
	editProduct,
	createProduct,
} from "../../api/requests";
import { getCoordinates } from "../../api/requests";

const drawerWidth = 240;

const defaultproductData = {
	name: "",
	price: "",
	description: "",
	image: "",
	address: "",
	radius: "",
	imageName: "",
};

const Products = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [displayed, setDisplayed] = useState([]);
	const [allData, setAllData] = useState([]);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);
	const [createProductModalOpen, setCreateProductModalOpen] = useState(false);
	const [createProductData, setCreateProductData] =
		useState(defaultproductData);
	const [editModalSuccessOpen, setEditModalSuccessOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editProductData, setEditProductData] = useState(defaultproductData);

	const queryClient = useQueryClient();

	const {
		data: productData = [],
		isLoading: productLoading,
		isError: productError,
		error: productErrorMessage,
	} = useQuery(["get-products"], async () => fetchProducts(), {
		select: (data) => data.data?.data,
		staleTime: 4 * 60 * 1000,
	});

	useEffect(() => {
		if (productError) {
			if (productErrorMessage.response) {
				toast.error(productErrorMessage.response.data?.message);
			} else if (productErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", productErrorMessage.message);
			}
		}
	}, [productError, productErrorMessage]);

	const { mutate: destroyProduct } = useMutation(
		"delete-product",
		deleteProduct,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
				setSelectedItem(null);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-products");
			},
		}
	);

	const { mutate: addProduct, isLoading: addProductLoading } = useMutation(
		"create-product",
		createProduct,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
				setOpenSuccessModal(true);
				setCreateProductData(defaultproductData);
				setCreateProductModalOpen(false);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-products");
			},
		}
	);

	const { mutate: updateProduct, isLoading: updateLoading } = useMutation(
		"edit-product",
		editProduct,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
				setEditModalSuccessOpen(true);
				setEditProductData(defaultproductData);
				setEditModalOpen(false);
				setSelectedItem(null);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-products");
			},
		}
	);

	const handleDeleteProduct = async () => {
		const payload = {
			name: selectedItem.name,
		};
		await destroyProduct(payload);
	};

	const handleCreateProduct = async (e) => {
		e.preventDefault();
		if (!createProductData.name) {
			toast.error("Name is required");
			return;
		}
		if (!createProductData.price) {
			toast.error("Price is required");
			return;
		}
		if (!createProductData.description) {
			toast.error("Description is required");
			return;
		}
		if (!createProductData.image) {
			toast.error("Image is required");
			return;
		}
		if (!createProductData.address) {
			toast.error("Address is required");
			return;
		}
		if (!createProductData.radius) {
			toast.error("Radius is required");
			return;
		}
		try {
			const response = await getCoordinates(createProductData.address);
			if (!response.results[0].geometry) {
				throw new Error("Invalid address");
			}
			const geoCords = response.results[0].geometry;
			const formData = new FormData();
			formData.append("name", createProductData.name);
			formData.append("price", createProductData.price);
			formData.append("description", createProductData.description);
			formData.append("image", createProductData.image);
			formData.append("address", createProductData.address);
			formData.append("radius", createProductData.radius);
			formData.append("location[0]", geoCords.lng);
			formData.append("location[1]", geoCords.lat);

			await addProduct(formData);
		} catch (errors) {
			if (errors.response) {
				toast.error(errors.response.data.message);
			} else if (errors.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", errors.message);
			}
		}
	};

	const handleEditProduct = async (e) => {
		e.preventDefault();
		if (!editProductData.name) {
			toast.error("Name is required");
			return;
		}
		if (!editProductData.price) {
			toast.error("Price is required");
			return;
		}
		if (!editProductData.description) {
			toast.error("Description is required");
			return;
		}
		if (!editProductData.address) {
			toast.error("Address is required");
			return;
		}
		if (!editProductData.radius) {
			toast.error("Radius is required");
			return;
		}
		try {
			const response = await getCoordinates(editProductData.address);
			if (!response.results[0].geometry) {
				throw new Error("Invalid address");
			}
			const geoCords = response.results[0].geometry;
			const payload = {
				name: editProductData.name,
				price: editProductData.price,
				description: editProductData.description,
				address: editProductData.address,
				radius: editProductData.radius,
				location: [geoCords.lng, geoCords.lat],
			};

			await updateProduct({ id: selectedItem.id, payload });
		} catch (errors) {
			console.log(errors);
			if (errors.response) {
				toast.error(errors.response.data.message);
			} else if (errors.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", errors.message);
			}
		}
	};

	useEffect(() => {
		if (selectedItem && Object.keys(selectedItem).length > 0) {
			setEditProductData({
				...editProductData,
				name: selectedItem.name,
				price: selectedItem.price,
				description: selectedItem.description,
				address: selectedItem.address,
				radius: selectedItem.radius,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItem]);

	useEffect(() => {
		if (productData.length && !productLoading) {
			setDisplayed(productData);
			setAllData(productData);
		}
	}, [productData, productLoading]);

	useEffect(() => {
		if (allData.length) {
			let filtered = [...allData];
			if (searchTerm) {
				filtered = filtered.filter((item) => {
					return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
				});
			}
			setDisplayed(filtered);
		}
	}, [allData, searchTerm]);

	return (
		<Box
			sx={{
				display: "flex",
				width: "100vw !important",
				maxWidth: "100%",
			}}
		>
			<CssBaseline />
			<Layout />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					minHeight: "100vh",
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					p: {
						md: "2rem",
						xs: "1rem",
					},
				}}
			>
				<Toolbar />
				{/* header */}
				<Box sx={{ mb: "2rem" }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexDirection: { sm: "row", xs: "column" },
							mb: "1rem",
						}}
					>
						<Typography
							variant="h6"
							sx={{ fontWeight: 700, textTransform: "capitalize", mr: "auto" }}
							gutterBottom
						>
							Products
						</Typography>

						<Box
							sx={{
								display: "flex",
								// justifyContent: { xs: "flex-start", sm: "flex-end" },
								width: { xs: "100%", sm: "auto" },
							}}
						>
							<Box sx={{ ml: { md: "auto", xs: 0 }, mr: "1rem" }}>
								<TextField
									id="table-search-box"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									label="Search Products"
									variant="outlined"
									size="small"
									sx={{
										label: {
											color: "#594E4E !important",
										},
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "#594E4E !important",
										},
									}}
								/>
							</Box>

							<Box sx={{ ml: { md: "auto", xs: 0 } }}>
								<Button
									variant="contained"
									color="primary"
									sx={{ textTransform: "capitalize", color: "#fff" }}
									onClick={() => setCreateProductModalOpen(true)}
								>
									add new product
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>

				{/* table */}
				<Box
					sx={{
						// width: { md: "78vw", xs: "95vw" },
						width: "100%",
						overflow: "auto",
						maxWidth: "100%",
						boxSizing: "border-box",
					}}
				>
					<Table
						data={displayed}
						loading={productLoading}
						setSelectedItem={setSelectedItem}
						handleDelete={handleDeleteProduct}
						handleEdit={(item) => {
							setEditModalOpen(true);
						}}
					/>
				</Box>
			</Box>
			<SuccessModal
				open={openSuccessModal}
				handleClose={() => setOpenSuccessModal(false)}
				text="Product created successfully"
			/>
			<SuccessModal
				open={editModalSuccessOpen}
				handleClose={() => setEditModalSuccessOpen(false)}
				text="Product edited successfully"
			/>
			<CreateProductModal
				open={createProductModalOpen}
				handleClose={() => {
					setCreateProductModalOpen(false);
					setCreateProductData(defaultproductData);
				}}
				editData={createProductData}
				title=""
				subtitle="Create Product"
				setEditData={setCreateProductData}
				loading={addProductLoading}
				handleSubmit={handleCreateProduct}
				isEdit={false}
			/>
			<CreateProductModal
				open={editModalOpen}
				handleClose={() => {
					setEditModalOpen(false);
					setEditProductData(defaultproductData);
				}}
				editData={editProductData}
				title=""
				subtitle="Edit Product"
				setEditData={setEditProductData}
				loading={updateLoading}
				handleSubmit={handleEditProduct}
				isEdit
			/>
		</Box>
	);
};

export default Products;
