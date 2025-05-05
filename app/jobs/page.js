import React from "react";
import JobsPage from "../JobsPage";
import ApplyJobPage from "../ApplyJobPage";
import PostJobPage from "../PostJobPage";
import Campus from "../Campus/Campus";
import Dashboard from "../Dashboard";
import Sidebar from "../components/Dashboard/Sidebar";
import Login from "../login/Login";

function page() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* <ApplyJobPage></ApplyJobPage> */}
      {/* <PostJobPage></PostJobPage> */}
      {/* <JobsPage></JobsPage> */}
      <Sidebar />
      <Dashboard></Dashboard>
      {/* <Campus></Campus> */}
      {/* <Login></Login> */}
    </div>
  );
}

export default page;
