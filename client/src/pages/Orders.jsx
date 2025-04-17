import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { sidebarLinks } from "../db";

const Orders = () => {
  return (
    <>

<main className="wrapper grid grid-cols-3 gap-4 bg-[] ">
      {/* Sidebar */}
      <aside className="col-span-1 border p-4 bg-[#1b1a1a] text-white">
        <div className="space-y-4">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "block bg-yellow-600 text-black py-2 px-4 rounded"
                : "block py-2 px-4"
            }
          >
            Orders
          </NavLink>

          <button className="text-red-500 mt-8">Log Out</button>
        </div>
      </aside>

      {/* Main Orders Section */}
      <section className="col-span-2 border p-4 bg-[#1b1a1a] text-white">
        <h1 className="text-xl font-semibold mb-4">Orders</h1>

        {/* Sub-navigation */}
        <div className="flex space-x-6 border-b border-gray-600 mb-4">
          <NavLink
            to="delivered"
            end
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-yellow-500 text-yellow-500"
                : "pb-2 text-white hover:text-yellow-500"
            }
          >
            Ongoing/Delivered
          </NavLink>

          <NavLink
            to="cancelled"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-yellow-500 text-yellow-500"
                : "pb-2 text-white hover:text-yellow-500"
            }
          >
            Cancelled
          </NavLink>
        </div>

        <Outlet />
      </section>
    </main>
      {/* <main className="wrapper grid grid-cols-3 gap-4">
        <section className="col-span-1 border">
          {sidebarLinks.map((sidebar) => {
            const { id, path, Icon, name } = sidebar;
            return (
              <div key={id} >
                <NavLink key={id} to={path} end>
                  {({ isActive, isPending }) => (
                    <span className="">
                      <h6> {name} </h6>
                    </span>
                  )}
                </NavLink>
               
              </div>
            );
          })}
          <h1>Orders</h1>
          <h1>logout</h1>
        </section>

        <section className="border col-span-2">
          <Outlet />
        </section>
      </main> */}
    </>
  );
};

export default Orders;
