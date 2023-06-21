import React from "react";
import Drawer from "@mui/material/Drawer";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as LyloIcon } from "../../assets/lylo-logo.svg";

const drawerWidth = "15%";

const SidebarLayout = (props) => {
	return (
		<React.Fragment>
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
				{props.children}
				{/* <SidebarContent /> */}
			</Drawer>
		</React.Fragment>
	);
};

export default SidebarLayout;
