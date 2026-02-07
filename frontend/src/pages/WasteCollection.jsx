import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WasteForm from "../components/WasteForm";
import WasteList from "../components/WasteList";
import API from "../utils/api";

const WasteCollection = () => {
  const [items, setItems] = useState([]);

  const fetchWaste = async () => {
    const res = await API.get("/waste");
    setItems(res.data);
  };

  useEffect(() => {
    fetchWaste();
  }, []);

  const addWaste = async (data) => {
    await API.post("/waste", {
      location: data.location,
      type: data.type,
      description: data.desc,
    });
    fetchWaste();
  };

  const updateStatus = async (id, status) => {
    if (status === "scheduled") {
      await API.put(`/waste/${id}/done`);
    } else {
      await API.put(`/waste/${id}/reopen`);
    }
    fetchWaste();
  };

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="waste-page">
          <WasteForm onAdd={addWaste} />
          <WasteList items={items} onResolve={updateStatus} />
        </div>
      </div>
    </div>
  );
};

export default WasteCollection;
