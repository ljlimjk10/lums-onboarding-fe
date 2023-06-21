import React from "react";
import {
	BarChartLineFill,
	PersonFill,
	PersonFillAdd,
	FileTextFill,
	FileEarmarkPlusFill,
	ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import SidebarLayout from "../Layout/SidebarLayout";
import SidebarItemCard from "../Layout/SidebarItemCard";

const Sidebar = () => {
	return (
		<SidebarLayout>
			<SidebarItemCard
				icon={<BarChartLineFill color="#FFFFFF" />}
				text="Dashboard"
			/>
			<SidebarItemCard
				icon={<PersonFill color="#FFFFFF" />}
				text="Users"
			/>
			<SidebarItemCard
				icon={<PersonFillAdd color="#FFFFFF" />}
				text="Pending Users"
			/>
			<SidebarItemCard
				icon={<FileTextFill color="#FFFFFF" />}
				text="Posts"
			/>
			<SidebarItemCard
				icon={<FileEarmarkPlusFill color="#FFFFFF" />}
				text="Create Post"
			/>
			<SidebarItemCard
				icon={<ArrowLeftCircleFill color="#FFFFFF" />}
				text="Sign Out"
			/>
		</SidebarLayout>
	);
};

export default Sidebar;
