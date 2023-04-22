import { useState, useContext } from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
import { NavigateContext } from "../context/NavigateContext";

function Sidebar() {
  const {viewingState } = useContext(NavigateContext)
    return (
      <div className={viewingState.viewingChat ? "sidebar sidebarsmSet": "sidebar sidebarsmSetHide"}>
          <Navbar />
          <Search />
          <Chats />
      </div>
    );
  }
  
  export default Sidebar;
  