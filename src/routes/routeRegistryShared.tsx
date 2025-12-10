/** 
 * This registry for routing page that shared between public or private page
 * so user from public or private can access the page with different layout
*/

import { Link } from "react-router-dom";
import { LoginPage } from "../pages";

export const routeRegistryShared: IPageRoute[] = [
  {
    key: 'login',
    title: 'login',
    label: <Link to='/login'></Link>,
    path: '/login',
    element: <LoginPage />,
    icon: null,
    children: undefined,
  },
]