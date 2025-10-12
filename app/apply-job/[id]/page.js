"use client";
import { use } from "react";
import ApplyJobPage from "../../ApplyJobPage";

export default function ApplyJobRoute({ params }) {
  const { id } = use(params);
  return <ApplyJobPage jobId={parseInt(id)} />;
}



