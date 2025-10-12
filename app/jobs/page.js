"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import Sidebar from "../components/Dashboard/Sidebar";

function Page() {
  const [activeFilters, setActiveFilters] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  if (!mounted) {
    return null; // Prevent SSR mismatch
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar onFilterChange={handleFilterChange} />
      <Dashboard filters={activeFilters} />
    </div>
  );
}

export default Page;
