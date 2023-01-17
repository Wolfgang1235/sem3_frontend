import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import facade from "../../facades/apiFacade";

const UserRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    facade.getRentalsByUser((allRentals) => {
      setRentals(allRentals);
    });
  }, [facade]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Your Rental agreements</h3>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Price annual</th>
            <th>Deposit</th>
            <th>Contact person</th>
            <th>House id</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>{rental.start_date}</td>
              <td>{rental.end_date}</td>
              <td>{rental.price_annual}</td>
              <td>{rental.deposit}</td>
              <td>{rental.contact_person}</td>
              <td>{rental.house_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRentals;
