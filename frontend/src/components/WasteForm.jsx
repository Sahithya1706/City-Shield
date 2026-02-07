import { useState } from "react";

const WasteForm = ({ onAdd }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!location || !type) return;

    onAdd({ location, type, desc });

    setLocation("");
    setType("");
    setDesc("");
  };

  return (
    <form className="waste-form" onSubmit={submit}>
      <h3>Request Waste Collection</h3>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Waste Type</option>
        <option value="Dry Waste">Dry Waste</option>
        <option value="Wet Waste">Wet Waste</option>
        <option value="Bulk Waste">Bulk Waste</option>
      </select>

      <textarea
        placeholder="Additional details"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="cta-btn">Submit Request</button>
    </form>
  );
};

export default WasteForm;
