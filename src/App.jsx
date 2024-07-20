import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import DesktopNav from "./components/nav/DesktopNav";

export default function App() {
  return (
    <>
      <DesktopNav />
      <div className="flex flex-col md:pl-64 lg:pl-72">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
