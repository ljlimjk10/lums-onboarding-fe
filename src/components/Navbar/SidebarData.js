import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as LuIcons from "react-icons/lu";

export const SidebarData = [
	{
		title: "Dashboard",
		path: "/",
		icon: <AiIcons.AiOutlineDashboard />,
		cName: "nav-text",
	},
	{
		title: "Users",
		path: "/users",
		icon: <AiIcons.AiOutlineUser />,
		cName: "nav-text",
	},
	{
		title: "Pending Users",
		path: "/pending-users-table",
		icon: <AiIcons.AiOutlineUsergroupAdd />,
		cName: "nav-text",
	},
	{
		title: "Posts",
		path: "/posts",
		icon: <AiIcons.AiOutlineMail />,
		cName: "nav-text",
	},
	{
		title: "New Post",
		path: "/new-post",
		icon: <LuIcons.LuMailPlus />,
		cName: "nav-text",
	},
	{
		title: "Questions",
		path: "/support",
		icon: <IoIcons.IoMdHelpCircle />,
		cName: "nav-text",
	},
	{
		title: "Sign Out",
		path: "/login",
		icon: <AiIcons.AiOutlineCloseCircle />,
		cName: "nav-text",
	},
];
