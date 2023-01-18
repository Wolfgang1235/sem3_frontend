import React from "react";
import { useState } from "react";
import facade from "../facades/apiFacade";

const Tenants = () => {
  const [houseId, setHouseId] = useState(0);
  const [tenants, setTenants] = useState([]);

  const handleSubmit = (event) => {
    facade.getTenantsByHouseId(houseId, (data) => {
      setTenants(data);
    });

    event.preventDefault();
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Search for Tenants</h2>
      <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <label>
          Enter House id for search:
          <input
            type="number"
            value={houseId}
            onChange={(event) => setHouseId(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
        {tenants.length > 0 && (
          <table
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "5px",
              border: "solid 1px",
              border: "1px solid black",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>Name</td>
                <td style={{ border: "1px solid black" }}>Phonenumber</td>
              </tr>
            </thead>

            {tenants.map((tenant) => (
              <tbody>
                <tr style={{ border: "1px solid black" }}>
                  <td style={{ border: "1px solid black" }}>{tenant.name}</td>
                  <td style={{ border: "1px solid black" }}>{tenant.phone}</td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
      </form>
    </div>
  );
};

export default Tenants;
