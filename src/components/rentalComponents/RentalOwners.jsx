import React from "react";

const RentalOwners = (props) => {
  return (
    <div>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Tenant ids</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.rental}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RentalOwners;
