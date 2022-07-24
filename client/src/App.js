import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { AuthContextProvider } from "./contexts/AuthContext";
import customTheme from "./config/themeConfig";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import MyProducts from "./pages/MyProducts/MyProducts";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const queryClient = new QueryClient();
	return (
		<ThemeProvider theme={customTheme}>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<ToastContainer />
					<BrowserRouter>
						<Routes>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/my-products" element={<MyProducts />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/" element={<Login />} />
						</Routes>
					</BrowserRouter>
				</AuthContextProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
