import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import facade from "../../facades/apiFacade";
import RentalRow from "./RentalRow";

const Rentals = () => {
  const [rental, setRental] = useState({
    start_date: "",
    end_date: "",
    price_annual: 0,
    deposit: 0,
    contact_person: "",
    house_id: 0,
    tenant_ids: [],
    tenant_id: 0,
  });
  const [rentals, setRentals] = useState([]);
  const [houses, setHouses] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    facade.getHouses((houses) => {
      setHouses(houses);
    });
    facade.getTenants((tenants) => {
      setTenants(tenants);
    });
    facade.getRentals((rentals) => {
      setRentals(rentals);
    });
  }, []);

  const onInputChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setRental({ ...rental, [key]: value });
  };

  const onSubmit = (event) => {
    if (event.target.form.checkValidity()) {
      const rentalToEndpoint = { ...rental };
      rentalToEndpoint["tenant_ids"] = [rentalToEndpoint.tenant_id];
      rentalToEndpoint["tenant_id"] = undefined;
      facade.postRental(rentalToEndpoint, (rentalFromEndpoint) => {
        setRentals([...rentals, rentalFromEndpoint]);
      });
      setRental({
        start_date: "",
        end_date: "",
        price_annual: 0,
        deposit: 0,
        contact_person: "",
        house_id: 0,
        tenant_ids: [],
      });
    }
    event.preventDefault();
  };

  const updateRental = (rental, rentalId, event) => {
    facade.putRental(rental, rentalId, (rentalFromEndpoint) => {
      setRentals(
        rentals.map((rental) =>
          rental.id !== rentalId ? rental : rentalFromEndpoint
        )
      );
    });
    event.preventDefault();
  };

  const deleteRental = (rentalId, event) => {
    facade.deleteRental(rentalId, (rentalId) => {
      setRentals(rentals.filter((rental) => rental.id !== rentalId));
    });
    event.preventDefault();
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Create rental agreement</h3>
      <form style={{ textAlign: "center" }}>
        <input
          id="start_date"
          type="text"
          placeholder="Start date"
          value={rental.start_date}
          onChange={onInputChange}
          required
        />
        <input
          id="end_date"
          type="text"
          placeholder="End date"
          value={rental.end_date}
          onChange={onInputChange}
          required
        />
        <input
          id="price_annual"
          type="number"
          placeholder="Price annual"
          value={rental.price_annual}
          onChange={onInputChange}
          required
        />
        <input
          id="deposit"
          type="number"
          placeholder="Deposit"
          value={rental.deposit}
          onChange={onInputChange}
          required
        />
        <input
          id="contact_person"
          type="text"
          placeholder="Contact person"
          value={rental.contact_person}
          onChange={onInputChange}
          required
        />
        <select id="house_id" type="number" onChange={onInputChange}>
          <option value="" disabled selected>
            Select a House
          </option>
          {houses.map((house) => (
            <HouseOption key={house.id} house={house} />
          ))}
        </select>
        <select id="tenant_id" type="number" onChange={onInputChange}>
          <option value="" disabled selected>
            Select a Tenant
          </option>
          {tenants.map((tenant) => (
            <TenantOption key={tenant.id} tenant={tenant} />
          ))}
        </select>
        <button type="submit" onClick={onSubmit}>
          Create
        </button>
      </form>
      <h4 style={{ textAlign: "center" }}>Rental agreements</h4>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Payment annual</th>
            <th>Deposit</th>
            <th>Contact person</th>
            <th>House</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <RentalRow
              key={rental.id}
              rental={rental}
              houses={houses}
              HouseOption={HouseOption}
              onInputChange={onInputChange}
              updateRental={updateRental}
              deleteRental={deleteRental}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const HouseOption = ({ house, rentalHouseId }) =>
  rentalHouseId === house.id ? (
    <option key={house.id} value={house.id} selected>
      {house.address}, {house.city}
    </option>
  ) : (
    <option key={house.id} value={house.id}>
      {house.address}, {house.city}
    </option>
  );

const TenantOption = ({ tenant }) => (
  <option key={tenant.id} value={tenant.id}>
    {tenant.name}
  </option>
);

export default Rentals;
