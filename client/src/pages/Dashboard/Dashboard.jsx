import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import ProductCard from "../../components/common/ProductCard";
import Layout from "../../components/common/Layout";
import CommentModal from "../../components/common/CommmentModal";
import { getProductsByLocationRadius, comment } from "../../api/requests";

const drawerWidth = 240;

const Dashboard = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [productComments, setProductComments] = useState("");
	const [commentModalOpen, setCommentModalOpen] = useState(false);

	const queryClient = useQueryClient();

	const {
		data: productData = [],
		// isLoading: productLoading,
		isError: productError,
		error: productErrorMessage,
	} = useQuery(
		["get-products-by-location"],
		async () => getProductsByLocationRadius(),
		{
			select: (data) => data.data?.data,
			staleTime: 4 * 60 * 1000,
		}
	);

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

	const { mutate: commentProduct, isLoading: commentProductLoading } =
		useMutation("comment-on-product", comment, {
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
				setProductComments("");
				setCommentModalOpen(false);
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
		});

	const handleProductComment = async (e) => {
		e.preventDefault();
		const payload = {
			comment: productComments,
		};
		await commentProduct({ id: selectedItem.id, payload });
	};

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
				<Typography variant="h6" sx={{ color: "#002674", fontWeight: "bold" }}>
					Products Near You
				</Typography>
				<Grid
					container
					spacing={3}
					sx={{
						mb: { md: "4rem", xs: "1rem" },
						mt: { mb: "2rem", xs: "1rem" },
					}}
				>
					{productData.map((product) => (
						<Grid item xs={12} sm={6} md={4} key={product.id}>
							<Box>
								<ProductCard
									image={product.imageUrl?.split("/public/")[1]}
									name={product.name}
									description={product.description}
									price={product.price}
									onClick={() => {
										setSelectedItem(product);
										setCommentModalOpen(true);
									}}
								/>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
			<CommentModal
				open={commentModalOpen}
				handleClose={() => {
					setCommentModalOpen(false);
					setProductComments("");
				}}
				editData={productComments}
				title=""
				subtitle="Comment on Product"
				setEditData={setProductComments}
				loading={commentProductLoading}
				handleSubmit={handleProductComment}
			/>
		</Box>
	);
};

export default Dashboard;
