import { useState } from "react";
import {
  CityType,
  createNewCityCustomId,
  // createNewCityLinedElementsCustomId,
  // createNewCityAutomaticId,
  // updateCity,
} from "./utils/read-data-firestore";
import {
  getCity,
  // getCityByState
} from "./utils/write-data-firestore";

function App() {
  const [city, setCity] = useState<string>("");
  const [dataCity, setDataCity] = useState<CityType>();
  const [formValues, setFormValues] = useState({
    initials: "",
    name: "",
    state: "",
    country: "",
  });

  // useEffect(() => {
  //   return () => {
  //     unsub();
  //   };
  // }, [unsub]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createNewCityCustomId(formValues);
    // await createNewCityLinedElementsCustomId(formValues);
    // await createNewCityAutomaticId(formValues);
    // await updateCity(formValues);
  };

  const displayCity = async () => {
    const data = await getCity(city);
    setDataCity(data as CityType);

    // await getCityByState(city);
  };

  return (
    <div>
      <div style={{ marginBottom: 80 }}>
        <h1>Adicionar dados</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="initials">Initials:</label>
            <input
              type="text"
              id="initials"
              name="initials"
              value={formValues.initials}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formValues.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h1>Ler dados</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button onClick={() => displayCity()}>Ler</button>

        <pre>{JSON.stringify(dataCity, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
