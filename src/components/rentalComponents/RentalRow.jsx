import React from "react";
import { useState } from "react";
import RentalOwners from "./RentalOwners";

const RentalRow = ({
  rental,
  houses,
  HouseOption,
  updateRental,
  deleteRental,
}) => {
  const [toggleShowable, setToggleShowable] = useState(true);
  const [toggleEditable, setToggleEditable] = useState(false);

  const [rentalRow, setRentalRow] = useState({
    start_date: rental.start_date,
    end_date: rental.end_date,
    price_annual: rental.price_annual,
    deposit: rental.deposit,
    contact_person: rental.contact_person,
    house_id: rental.house.id,
  });

  const onInputChange = (event) => {
    const value = event.target.value;
    const key = event.target.id;
    setRentalRow({ ...rentalRow, [key]: value });
  };

  return (
    <tr>
      <td>{rental.id}</td>
      <td>
        {toggleEditable ? (
          <input
            id="start_date"
            type="text"
            value={rentalRow.start_date}
            onChange={onInputChange}
          />
        ) : (
          rental.start_date
        )}
      </td>
      <td>
        {toggleEditable ? (
          <input
            id="end_date"
            type="text"
            value={rentalRow.end_date}
            onChange={onInputChange}
          />
        ) : (
          rental.end_date
        )}
      </td>
      <td>
        {toggleEditable ? (
          <input
            id="price_annual"
            type="number"
            value={rentalRow.price_annual}
            onChange={onInputChange}
          />
        ) : (
          rental.price_annual
        )}
      </td>
      <td>
        {toggleEditable ? (
          <input
            id="deposit"
            type="number"
            value={rentalRow.deposit}
            onChange={onInputChange}
          />
        ) : (
          rental.deposit
        )}
      </td>
      <td>
        {toggleEditable ? (
          <input
            id="contact_person"
            type="text"
            value={rentalRow.contact_person}
            onChange={onInputChange}
          />
        ) : (
          rental.contact_person
        )}
      </td>
      <td>
        {toggleEditable ? (
          <select id="house_id" type="number" onChange={onInputChange}>
            {houses.map((house) => (
              <HouseOption
                key={house.id}
                house={house}
                rentalHouseId={rental.house.id}
              />
            ))}
          </select>
        ) : (
          (rental.house.address, rental.house.city)
        )}
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
        {toggleEditable ? (
          <button
            onClick={(event) => {
              const rentalDTO = {
                start_date: rentalRow.start_date,
                end_date: rentalRow.end_date,
                price_annual: rentalRow.price_annual,
                deposit: rentalRow.deposit,
                contact_person: rentalRow.contact_person,
                house: { id: rentalRow.house_id },
              };

              updateRental(rentalDTO, rental.id, event);

              setToggleEditable(!toggleEditable);
            }}
          >
            Save
          </button>
        ) : (
          <button onClick={() => setToggleEditable(!toggleEditable)}>
            Edit
          </button>
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
