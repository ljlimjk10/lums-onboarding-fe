import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as LuIcons from 'react-icons/lu';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiOutlineDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/ExistingUsersTable',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Pending Users',
    path: '/PendingUsersTable',
    icon: <AiIcons.AiOutlineUsergroupAdd />,
    cName: 'nav-text'
  },
  {
    title: 'Posts',
    path: '/team',
    icon: <AiIcons.AiOutlineMail />,
    cName: 'nav-text'
  },
  {
    title: 'New Post',
    path: '/messages',
    icon: <LuIcons.LuMailPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Questions',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Sign Out',
    path: '/LoginPage',
    icon: <AiIcons.AiOutlineCloseCircle />,
    cName: 'nav-text'
  }
];
