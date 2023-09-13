import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pet from "./Pet";
import useBreedList2 from "./useBreedList2";
import Result from "./Result";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds, status] = useBreedList2(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();
    console.log(json);
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            value={location}
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
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
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
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
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            disabled={breeds.length === 0}
          >
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
