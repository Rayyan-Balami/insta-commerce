import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useAuthInitialization } from "./hooks/useAuthInitialization";
import { useProductInitialization } from "./hooks/useProductInitialization";
import DesktopNav from "./components/nav/DesktopNav";
import Header from "./components/header/Header";
import { useCartInitialization } from "./hooks/useCartInitalization";

export default function App() {
  useAuthInitialization();
  useProductInitialization();
  useCartInitialization();

  return (
    <>
      <DesktopNav />
      <div className="min-h-[100dvh] flex flex-col md:pl-64 lg:pl-72">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </>
  );
}
