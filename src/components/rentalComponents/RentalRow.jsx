import React from "react";
import { useState } from "react";
import RentalOwners from "./RentalOwners";

const RentalRow = ({ rental, houses, HouseOption, deleteRental }) => {
  const [toggleShowable, setToggleShowable] = useState(true);
  const [toggleEditable, setToggleEditable] = useState(false);

  const [rentalRow, setRentalRow] = useState({
    start_date: rental.start_date,
    end_date: rental.end_date,
    price_annual: rental.price_annual,
    deposit: rental.deposit,
    contact_person: rental.contact_person,
    house_id: rental.house_id,
  });

  const onInputChange = (event) => {
    const value = event.target.value;
    const key = event.target.id;
    setRentalRow({ ...rentalRow, [key]: value });
  };

  return (
    <tr>
      <td>{rental.id}</td>
      <td>{rental.start_date}</td>
      <td>{rental.end_date}</td>
      <td>{rental.price_annual}</td>
      <td>{rental.deposit}</td>
      <td>{rental.contact_person}</td>
      <td>
        {rental.house.address}, {rental.house.city}
      </td>
      <td>
        {toggleShowable ? (
          <button
            onClick={() => {
              setToggleShowable(!toggleShowable);
            }}
          >
            See Tenants
          </button>
        ) : (
          <>
            <RentalOwners rental={rental.tenant_ids} />
            <button onClick={() => setToggleShowable(!toggleShowable)}>
              Close
            </button>
          </>
        )}
      </td>
      <td>
        <button onClick={(event) => deleteRental(rental.id, event)}>
          Delete rental
        </button>
      </td>
    </tr>
  );
};

export default RentalRow;
