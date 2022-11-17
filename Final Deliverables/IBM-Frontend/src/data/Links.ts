import { AiFillDashboard } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { GiGears } from 'react-icons/gi';
import { BiNotepad } from 'react-icons/bi';
import { GrWorkshop } from 'react-icons/gr';
export const CorporateLinks = [
  {
    title: 'Dashboard',
    href: '/',
    id: '',
    icon: AiFillDashboard,
  },
  {
    title: 'Profile',
    href: '/profile',
    id: 'profile-nav-link',
    icon: ImProfile,
  },
  {
    title: 'Manage Jobs',
    href: '/jobs',
    id: 'manage-nav-link',
    icon: GiGears,
  },
];

export const StudentLinks = [
  {
    title: 'Dashboard',
    href: '/',
    id: '',
    icon: AiFillDashboard,
  },
  {
    title: 'Profile',
    href: '/profile',
    id: 'profile-nav-link',
    icon: ImProfile,
  },
  {
    title: 'Assessments',
    href: '/assessments',
    id: 'assessments-nav-link',
    icon: BiNotepad,
  },
  {
    title: 'Jobs',
    href: '/jobs',
    id: 'manage-nav-link',
    icon: GrWorkshop,
  },
];
