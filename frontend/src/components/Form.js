/* year origin firstHand mileage energy gearbox doors ratedHorsePower powerDIN critAir co2 owners */
import { useState, useEffect  } from "react";
import React, {Component} from 'react';
import ComboBox from './ComboBox';

function Checkbox(props) {
  return (
    <div className="element">
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
    </div>
  );
}

function InputNumber(props) {
  return (
    <div className="element">
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
    </div>
  );
}
function InputText(props) {
  return (
    <div className="element">
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
    </div>
  );
}

function RadioInput(props) {
  return (
    <div className="element">

    <label htmlFor={props.id}>
      {props.label}

      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.isChecked}
        onChange={props.onChange}
      />
    </label>
    </div>
  );
}
function PredictedPrice(props){
  return(
    <h2 id="predicted_price">{props.value ? `Votre voiture est estimée à ${parseInt(props.value)}€.` : ""}</h2>
  )
}
export default function Multiple() {
  const [selectedData, setSelectedData] = useState(null); // Lifted state from ComboBox
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: 2022,
    mileage: 0,
    energy: "energy0",
    gearbox: "gearbox0",
    origin: 0,
    firstHand: 0,
    owners:"1"
  });
  const [predictedPprice, setPredictedPrice] = useState("")
  const handlPredictedPrice = (event) => {
    setPredictedPrice()
  }

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [radioOption, setSelectedRadioOption] = useState("boite_automatique");
  const handleRadioChange = (event) => {
    setSelectedRadioOption(event.target.value);
    handleChange(event); 
  };

  const [selectedOption, setSelectedOption] = useState("energy0");
  const  handleDropdownChange = (event) => {
    setSelectedOption(event.target.value)
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const originIChecked = formData.origin
    const isFirstHandChecked = formData.firstHand

    var mileage = parseInt(formData.mileage)
    if (mileage > 1000){ mileage = parseInt(mileage / 1000)}
    var query = `[{
      "year":${formData.year || selectedData.year},
      "origin":${originIChecked},
      "firstHand":${isFirstHandChecked},
      "mileage":${mileage},
      "energy":${parseInt(selectedOption.replace("energy", ""))},
      "gearbox":${radioOption == "boite_automatique" ? 1 : 0},
      "doors":${formData.doors || selectedData.doors || 0},
      "ratedHorsePower":${formData.ratedHorsePower || selectedData.ratedHorsePower},
      "powerDIN":${formData.powerDIN || selectedData.powerDIN},
      "critAir":${formData.critAir || selectedData.critAir},
      "co2":${formData.co2 || selectedData.co2},
      "owners":${parseFloat(formData.owners)}
    }]`
    var api_url = `http://localhost:8000/api/predict_price?q=${query}`.replace(/\s/g, "")
    fetch(api_url)
          .then(response => response.json())
          .then(data => {
            setPredictedPrice(parseInt(data.prediction_price))
          });

  };

  return (
    <form onSubmit={handleSubmit}>

    <ComboBox  setSelectedData={setSelectedData} />
    {/* {"origin": "France", "year": 2017, "doors": 5.0, "ratedHorsePower": "10 CV", "powerDIN": "(DIN) 180 ch", "critAir": "1", "co2": "152 g/km"} */}
    {selectedData && (
      <>
      <div className="form-entries">
        <InputNumber 
          label="Année"
          name="year"
          id="year"
          value={selectedData.year}
          onChange={handleChange}
        />
      
        <InputNumber 
          label="Kilométrage"
          name="mileage"
          id="mileage"
          value={formData.mileage}
          onChange={handleChange}
        />
      
        <InputNumber 
          label="Nombre de porte"
          name="doors"
          id="doors"
          value={selectedData.doors}
          onChange={handleChange}
        />

        <InputNumber 
          label="Puissance (CV)"
          name="ratedHorsePower"
          id="ratedHorsePower"
          value={selectedData.ratedHorsePower}
          onChange={handleChange}
        />

        <InputNumber 
          label="Puissance (DIN)"
          name="powerDIN"
          id="powerDIN"
          value={selectedData.powerDIN}
          onChange={handleChange}
        />

        <Checkbox
          label="Importé"
          name="origin"
          id="origin"
          value={selectedData.year}
          onChange={handleChange}
        />

        <InputNumber
          label="critAir"
          name="critAir"
          id="critAir"
          value={selectedData.critAir}
          onChange={handleChange}
        />

        <InputNumber
          label="co2"
          name="co2"
          id="co2"
          value={selectedData.co2}
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
            <select  className="list-energy" value={selectedOption} onChange={handleDropdownChange}>
            <option  value="energy0">Diesel</option>
            <option  value="energy1">Essence</option>
            <option  value="energy2">Hybride essence électrique</option>
            <option  value="energy3">Electrique</option>
            <option  value="energy4">Bicarburation essence bioéthanol</option>
            <option  value="energy5">Hybride diesel électrique</option>
          </select>
        </label>
        <button id="submit-form" type="submit">Prédire le prix de vente</button>
        </div>
        <PredictedPrice  value={predictedPprice}/>

      </>
    )}
    </form>
  );
}