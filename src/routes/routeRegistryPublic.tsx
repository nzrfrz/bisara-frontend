/** 
 * This registry for routing page in home page (public page)
 * route link attach to the navbar menu or any link or button redirect at public page scope
*/

import { Link } from "react-router-dom";

import {
  HomePage,
  AboutUsPage,
  SupportUsPage,
  ContactPage,
  PublicDictionaryPage,
} from "../pages";

export const routeRegistryPublic: IPageRoute[] = [
  {
    key: 'home',
    title: 'Home',
    label: <Link to='/'></Link>,
    path: '/',
    element: <HomePage />,
    icon: null,
    children: undefined,
  },
  {
    key: 'kamus',
    title: 'Kamus',
    label: <Link to='/kamus'></Link>,
    path: '/kamus',
    element: <PublicDictionaryPage />,
    icon: null,
    children: undefined,
  },
  {
    key: 'aboutUs',
    title: 'About Us',
    label: <Link to='/about-us'></Link>,
    path: '/about-us',
    element: <AboutUsPage />,
    icon: null,
    children: undefined,
  },
  {
    key: 'supportUs',
    title: 'Support Us',
    label: <Link to='/support-us'></Link>,
    path: '/support-us',
    element: <SupportUsPage />,
    icon: null,
    children: undefined,
  },
  {
    key: 'contactUs',
    title: 'Contact Us',
    label: <Link to='/contact-us'></Link>,
    path: '/contact-us',
    element: <ContactPage />,
    icon: null,
    children: undefined,
  }
];