import Grid from "@mui/material/Grid";

const SidebarItemCard = (props) => {
	return (
		<Grid container spacing={1}>
			<Grid item sx={6} marginLeft="12%">
				{props.icon}
			</Grid>
			<Grid item sx={6}>
				{props.text}
			</Grid>
		</Grid>
	);
};

export default SidebarItemCard;
