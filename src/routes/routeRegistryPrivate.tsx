/** 
 * This registry for routing page inside dashboard (private page)
 * route link attach to the sidebar menu
*/

import { Link } from "react-router-dom";

import {
  Dashboard,
  DictionaryPage,
  TranslatePage,
  AddWordsPage,
  MinigamesPage
} from "../pages";

import {
  HomeOutlined,
} from "@ant-design/icons";
import { FaGamepad } from "react-icons/fa";
import { 
  BsTranslate, 
  BsDatabaseAdd,
} from "react-icons/bs";
import { LuBookOpen } from "react-icons/lu";

export const sidebarRoutes: IPageRoute[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    label: <Link to='/dashboard'>Dashboard</Link>,
    path: '/dashboard',
    element: <Dashboard />,
    icon: <HomeOutlined />,
    children: undefined,
  },
  {
    key: 'translator',
    title: 'Translator',
    label: <Link to='/translator'>Translator</Link>,
    path: '/translator',
    element: <TranslatePage />,
    icon: <BsTranslate />,
    children: undefined,
  },
  {
    key: 'kamuspv',
    title: 'Kamus',
    label: <Link to='/kamus-pv'>Kamus</Link>,
    path: '/kamus-pv',
    element: <DictionaryPage />,
    icon: <LuBookOpen />,
    children: undefined,
  },
  {
    key: 'addWords',
    title: 'Add Words',
    label: <Link to='/add-words'>Add Words</Link>,
    path: '/add-words',
    element: <AddWordsPage />,
    icon: <BsDatabaseAdd />,
    children: undefined,
  },
  {
    key: 'miniGames',
    title: 'Mini Games',
    label: <Link to='/mini-games'>Mini Games</Link>,
    path: '/mini-games',
    element: <MinigamesPage />,
    icon: <FaGamepad />,
    children: undefined,
  },
];

/**

  // {
  //   key: 'form_items',
  //   title: 'Form Items',
  //   label: 'Form Items',
  //   path: '/form-items',
  //   element: null,
  //   icon: <FaWpforms />,
  //   children: [
  //     {
  //       key: 'input_form',
  //       title: 'Input Form',
  //       label: <Link to='/form-items/input-form'>Input Form</Link>,
  //       path: '/form-items/input-form',
  //       element: <DemoFormItems />,
  //       icon: <MdInput />,
  //       children: undefined,
  //     },
  //     {
  //       key: 'uploader_form',
  //       title: 'Uploader Form',
  //       label: <Link to='/form-items/uploader-form'>Uploader Form</Link>,
  //       path: '/form-items/uploader-form',
  //       element: <DemoUploaderForm />,
  //       icon: <MdOutlineCloudUpload />,
  //       children: undefined,
  //     },
  //   ],
  // },
  // {
  //   key: 'level1',
  //   title: 'Level 1',
  //   label: 'Level 1',
  //   path: '/level1',
  //   element: null,
  //   icon: null,
  //   children: [
  //     {
  //       key: 'level11',
  //       title: 'Level 1.1',
  //       label: 'Level 1.1',
  //       path: '/level1/level1.1',
  //       element: null,
  //       icon: null,
  //       children: [
  //         {
  //           key: 'level11a',
  //           title: 'Level 1.1.a',
  //           label: <Link to='/level1/level1.1/level1.1.a'>Level 1.1.a</Link>,
  //           path: '/level1/level1.1/level1.1.a',
  //           element: <MenuLevelDemo />,
  //           icon: null,
  //           children: undefined,
  //         },
  //         {
  //           key: 'level11b',
  //           title: 'Level 1.1.b',
  //           label: 'Level 1.1.b',
  //           path: '/level1/level1.1/level1.1.b',
  //           element: null,
  //           icon: <StarFilled />,
  //           children: [
  //             {
  //               key: 'level11b1',
  //               title: 'Level 1.1.b.1',
  //               label: <Link to='/level1/level1.1/level1.1.b/level1.1.b.1'>Level 1.1.b.1</Link>,
  //               path: '/level1/level1.1/level1.1.b/level1.1.b.1',
  //               element: <MenuLevelDemo />,
  //               icon: <StarFilled />,
  //               children: undefined
  //             },
  //             {
  //               key: 'level11b2',
  //               title: 'Level 1.1.b.2',
  //               label: <Link to='/level1/level1.1/level1.1.b/level1.1.b.2'>Level 1.1.b.2</Link>,
  //               path: '/level1/level1.1/level1.1.b/level1.1.b.2',
  //               element: <MenuLevelDemo />,
  //               icon: <StarFilled />,
  //               children: undefined
  //             }
  //           ],
  //         },
  //         {
  //           key: 'level11c',
  //           title: 'Level 1.1.c',
  //           label: <Link to='/level1/level1.1/level1.1.c'>Level 1.1.c</Link>,
  //           path: '/level1/level1.1/level1.1.c',
  //           element: <MenuLevelDemo />,
  //           icon: null,
  //           children: undefined,
  //         },
  //       ],
  //     },
  //     {
  //       key: 'level12',
  //       title: 'Level 1.2',
  //       label: <Link to='/level1/level1.2'>Level 1.2</Link>,
  //       path: '/level1/level1.2',
  //       element: <MenuLevelDemo />,
  //       icon: null,
  //       children: undefined,
  //     },
  //     {
  //       key: 'level13',
  //       title: 'Level 1.3',
  //       label: <Link to='/level1/level1.3'>Level 1.3</Link>,
  //       path: '/level1/level1.3',
  //       element: <MenuLevelDemo />,
  //       icon: null,
  //       children: undefined,
  //     }
  //   ],
  // },
  // {
  //   key: 'level2',
  //   title: 'Level 2',
  //   label: 'Level 2',
  //   element: null,
  //   // label: <Link to='/level2'>Level 2</Link>,
  //   path: '/level2',
  //   // element: <MenuLevelDemo />,
  //   icon: null,
  //   children: [
  //     {
  //       key: 'level21',
  //       title: 'Level 2.1',
  //       label: <Link to='/level2/level2.1'>Level 2.1</Link>,
  //       path: '/level2/level2.1',
  //       element: <MenuLevelDemo />,
  //       icon: null,
  //       children: undefined,
  //     },
  //     {
  //       key: 'level22',
  //       title: 'Level 2.2',
  //       label: <Link to='/level2/level2.2'>Level 2.2</Link>,
  //       path: '/level2/level2.2',
  //       element: <MenuLevelDemo />,
  //       icon: null,
  //       children: undefined,
  //     },
  //     {
  //       key: 'level23',
  //       title: 'Level 2.3',
  //       label: <Link to='/level2/level2.3'>Level 2.3</Link>,
  //       path: '/level2/level2.3',
  //       element: <MenuLevelDemo />,
  //       icon: null,
  //       children: undefined,
  //     }
  //   ]
  // }
 */