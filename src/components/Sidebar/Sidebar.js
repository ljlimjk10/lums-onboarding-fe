import { createTheme, ThemeProvider, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import SidebarLayout from "../Layout/SidebarLayout";
import SidebarItemCard from "../Layout/SidebarItemCard";

const DashboardIcon = AssessmentIcon;
const ApproveUsersIcon = GroupAddIcon;

const theme = createTheme({
	typography: {
		fontFamily: ["Inter", "sans-serif"].join(","),
	},
	palette: {
		text: {
			primary: "#FFFFFF",
		},
		primary: {
			main: "#FFFFFF",
		},
	},
});

const Sidebar = () => {
	return (
		<ThemeProvider theme={theme}>
			<SidebarLayout>
				<SidebarItemCard
					icon={<DashboardIcon color="primary" />}
					text={<Typography color="primary">Dashboard</Typography>}
				/>
				<SidebarItemCard
					icon={<ApproveUsersIcon color="primary" />}
					text={
						<Typography color="primary">Approve Users</Typography>
					}
				/>
				<SidebarItemCard
					icon={<PersonIcon color="primary" />}
					text={<Typography color="primary">Users</Typography>}
				/>
			</SidebarLayout>
			
		</ThemeProvider>
		

	);
};

export default Sidebar;
