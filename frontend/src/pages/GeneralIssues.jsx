import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GeneralIssueForm from "../components/GeneralIssueForm";
import GeneralIssueList from "../components/GeneralIssueList";
import API from "../utils/api";

const GeneralIssues = () => {
  const [issues, setIssues] = useState([]);

  // ================= FETCH ISSUES =================
  const fetchIssues = async () => {
    const res = await API.get("/general-issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ================= ADD ISSUE (WITH IMAGE) =================
  const addIssue = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    await API.post("/general-issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    fetchIssues();
  };

  // ================= RESOLVE ISSUE =================
  const resolveIssue = async (id) => {
    await API.put(`/general-issues/${id}/resolve`);
    fetchIssues();
  };

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="housing-page">
          <GeneralIssueForm onAdd={addIssue} />
          <GeneralIssueList issues={issues} onResolve={resolveIssue} />
        </div>
      </div>
    </div>
  );
};

export default GeneralIssues;
