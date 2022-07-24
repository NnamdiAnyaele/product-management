import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { numberFormatter } from "../../utils/helpers";

const ProductCard = ({ image, name, price, description, onClick }) => {
	return (
		<Card
			sx={{
				maxWidth: 290,
				"&:hover": {
					boxShadow:
						"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
				},
			}}
		>
			<Box
				sx={{
					height: "319px",
					backgroundImage: `url(${image})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					padding: "0.8rem",
					width: {
						xs: "290px",
					},
				}}
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant="body1"
					sx={{ color: "#5F5F5F" }}
					component="div"
				>
					{name}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: "primary.main", fontStyle: "italic" }}
					gutterBottom
				>
					{description}
				</Typography>
				<Divider />
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Box sx={{ mr: "1rem" }}>
					<Typography
						gutterBottom
						variant="body1"
						sx={{ color: "#5F5F5F", fontWeight: "bold" }}
						component="div"
					>
						₦{numberFormatter(price)}
					</Typography>
				</Box>

				<Button
					variant="contained"
					sx={{
						textTransform: "capitalize",
						padding: "0.7rem 3rem",
						borderRadius: "0.5rem",
						backgroundColor: "primary.main",
						color: "white",
					}}
					onClick={onClick}
				>
					comment
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
