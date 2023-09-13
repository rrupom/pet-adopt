import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import Result from "./Result";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            placeholder="location"
            id="location"
          />
          <br />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option value="" selected>
              Select An Animal
            </option>
            {ANIMALS.map((animal) => {
              return <option key={animal}>{animal}</option>;
            })}
          </select>
        </label>
        <lable htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option value="" selected>
              Select A Breed
            </option>
            {breeds.map((breed) => {
              return <option key={breed}>{breed}</option>;
            })}
          </select>
        </lable>
        <br />
        <button>Adopt Me!</button>
      </form>
      <Result pets={pets} />
      {status}
      {console.log(pets)}
    </div>
  );
};

export default SearchParams;
