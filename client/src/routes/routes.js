import { lazy } from "react";

const Navbar = lazy(()=>import("../layouts/Navbar"));
const Home = lazy(()=> import("../pages/Home"));
const CheckOut = lazy(()=>import("../pages/CheckOut"))



export {Navbar,Home,CheckOut}