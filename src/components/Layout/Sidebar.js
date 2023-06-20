import React from "react";
import Drawer from "@mui/material/Drawer";
import SvgIcon from "@mui/material/SvgIcon";
import Grid from "@mui/material/Grid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";

import { ReactComponent as LyloIcon } from "../../assets/lylo-logo.svg";
import { createTheme, ThemeProvider, Typography } from "@mui/material";

const DashboardIcon = AssessmentIcon;
const ApproveUsersIcon = GroupAddIcon;

// TODO: have a separate component for the Sidebar contents for better readability
// TODO: create theme for the grid/flexbox configs

// for typography components only, make sure to use them
const theme = createTheme({
	typography: {
		fontFamily: ["Inter", "sans-serif"].join(","),
	},
	palette: {
		text: {
			primary: "#FFFFFF",
		},
	},
});

const drawerWidth = "20%";

const Sidebar = () => {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<Drawer
					variant="permanent"
					anchor="left"
					sx={{
						flexShrink: 0,
						display: "grid",
						"& .MuiDrawer-paperAnchorLeft": {
							width: drawerWidth,
							backgroundColor: "#1F2B37",
						},
					}}
				>
					<SvgIcon
						component={LyloIcon}
						inheritViewBox
						sx={{
							fontSize: 60,
							display: "flex",
							marginLeft: "10%",
						}}
					/>
					<DashboardIcon />
					<ApproveUsersIcon />
					<PersonIcon />
				</Drawer>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default Sidebar;
