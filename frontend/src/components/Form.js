/* year origin firstHand mileage energy gearbox doors ratedHorsePower powerDIN critAir co2 owners */
import { useState, useEffect  } from "react";
import React, {Component} from 'react';

function Checkbox(props) {
  return (
    <label htmlFor={props.id}>
      {props.label}
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={props.isChecked}
        onChange={props.onChange}
      />
    </label>
  );
}

function InputNumber(props) {
  return (
    <label htmlFor={props.id}>
      {props.label}
      <input
        type="number"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}
function InputText(props) {
  return (
    <label htmlFor={props.id}>
      {props.label}
      <input
        type="text"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}

function RadioInput(props) {
  return (
    <label htmlFor={props.id}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.isChecked}
        onChange={props.onChange}
      />
      {props.label}
    </label>
  );
}

export default function Multiple() {
  /* const [marques, setMarques] = useState([]); // Initial state for marques

  useEffect(() => {
    // Fetch data from the API and update marques state
    fetch('http://localhost:8000/api/')
      .then(response => response.json())
      .then(data => {
        setMarques(data); // Update the marques state with the fetched data
      });
  }, []); */

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    energy: "energy0",
    gearbox: "gearbox0",
    origin: false,
    firstHand: false,
    owners:""
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [radioOption, setSelectedRadioOption] = useState("boite_automatique");
  const handleRadioChange = (event) => {
    setSelectedRadioOption(event.target.value);
    handleChange(event); 
  };

  const [selectedOption, setSelectedOption] = useState("option1");
  const  handleDropdownChange = (event) => {
    setSelectedOption(event.target.value)
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const originIChecked = formData.origin
    const isFirstHandChecked = formData.firstHand

    alert(`Année: ${formData.year}, 
          Marque: ${formData.brand}, 
          Modèle: ${formData.model}, 
          Kilométrage: ${formData.mileage}, 
          Origine: ${originIChecked}, 
          Première main: ${isFirstHandChecked},  
          Energie: ${selectedOption},
          Boite_de_vitesse: ${radioOption},
          Anciens propriétaires: ${formData.owners},

    `);
    /* fetch('http://localhost:8000/api/predict_price?q=[{%22year%22:%202022,%22origin%22:%201,%22firstHand%22:%200,%22mileage%22:%2020,%22energy%22:%200,%22gearbox%22:%201,%22doors%22:%204,%22ratedHorsePower%22:%2010,%22powerDIN%22:%20190,%22critAir%22:%202,%22co2%22:%20132,%22owners%22:%202.0}]')
    .then(response => response.json())
    .then(data => console.log(data)); */

  };

  return (
    <form onSubmit={handleSubmit}>

      <InputText 
        label="Marque"
        name="brand"
        id="brand"
        value={formData.brand}
        onChange={handleChange}
      />

      <InputText 
        label="Modèle"
        name="model"
        id="model"
        value={formData.model}
        onChange={handleChange}
      />

      <InputNumber 
        label="Année"
        name="year"
        id="year"
        value={formData.year}
        onChange={handleChange}
      />

      <InputNumber 
        label="Kilométrage"
        name="mileage"
        id="mileage"
        value={formData.mileage}
        onChange={handleChange}
      />

      <Checkbox
        label="Importé"
        name="origin"
        id="origin"
        isChecked={formData.origin}
        onChange={handleChange}
      />

      <Checkbox
        label="Première main"
        name="firstHand"
        id="firstHand"
        isChecked={formData.firstHand}
        onChange={handleChange} 
      />

      <RadioInput
        label="Boite automatique"
        name="gearbox"
        id="boiteAutomatique"
        value="boite_automatique"
        isChecked={radioOption === "boite_automatique"}
        onChange={handleRadioChange}
      />

      <RadioInput
        label="Boite manuelle"
        name="gearbox"
        id="boiteManuelle"
        value="boite_manuelle"
        isChecked={radioOption === "boite_manuelle"}
        onChange={handleRadioChange}
      />

      <InputNumber 
        label="Nombre d'anciens propriétaire"
        name="owners"
        id="owners"
        value={formData.owners}
        onChange={handleChange}
      />

      <label>
			Energie :
          <select  value={selectedOption} onChange={handleDropdownChange}>
          <option  value="energy0">Diesel</option>
          <option  value="energy1">Essence</option>
          <option  value="energy2">Hybride essence électrique</option>
          <option  value="energy3">Electrique</option>
          <option  value="energy4">Bicarburation essence bioéthanol</option>
          <option  value="energy5">Hybride diesel électrique</option>
			  </select>
		  </label>

      <button type="submit">Submit</button>
    </form>
  );
}