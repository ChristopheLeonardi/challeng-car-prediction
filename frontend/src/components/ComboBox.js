import React from 'react'
import {render} from 'react-dom'
import Downshift from 'downshift'
import { useState, useEffect  } from "react";


export default function ComboBox({ setSelectedData }) {
    
    const [marques, setMarques] = useState([]); // Initial state for marques
    
    useEffect(() => {
        // Fetch data from the API and update marques state
        fetch('http://localhost:8000/api/get_data')
            .then(response => response.json())
            .then(data => { setMarques(data) });
    }, []);

    const handleDescriptionFetch = (selection) => {
        fetch(`http://localhost:8000/api/get_description?q=${selection}`)
          .then(response => response.json())
          .then(data => {
            setSelectedData(data); 
          });
      };
  
    return (
      <Downshift
        onChange={selection => {
        handleDescriptionFetch(selection);
      }}
        itemToString={item => (item ? item: '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <div>
            <div className="label">
              <label {...getLabelProps()}>Recherche Marque et Modèle</label>
              <div
                className="flex shadow-sm bg-white gap-0.5"
                {...getRootProps({}, {suppressRefError: true})}
              >
                <input
                  placeholder="Marque et modèle de voiture"
                  className="list-car"
                  {...getInputProps()}
                />
                <button
                  aria-label={'toggle menu'}
                  className="px-2"
                  type="button"
                  {...getToggleButtonProps()}
                >
                  {isOpen ? <>&#8593;</> : <>&#8595;</>}
                </button>
              </div>
            </div>
            <ul
              className={`combobox ${
                !(isOpen && marques.length) && 'hidden'
              }`}
              {...getMenuProps()}
            >
              {isOpen
                ? marques
                    .filter(
                      item =>
                        !inputValue ||
                        item
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        item
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()),
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item,
                          index,
                          item,
                        })}
                      >
                        <span className="text">
                          {item}
                        </span>
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    )
  }