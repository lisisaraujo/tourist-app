import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();
  const places = useSWR("/api/cards");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newCard = Object.fromEntries(formData);
    console.log("newCard", newCard);

    const response = await fetch("/api/cards/create", {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      places.mutate();

      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <div>
      <EntryForm onSubmit={handleSubmit}>
        <InputWrapper>
          <label htmlFor="name">Name</label>
          <input id="name" name="name"></input>
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image"></input>
          <label htmlFor="location">Location</label>
          <input id="location" name="location"></input>
          <label htmlFor="map-url">Map URL</label>
          <input id="map-url" name="map-url"></input>
          <label htmlFor="description">Description</label>
          <input id="description" name="description"></input>
          <button onClick={() => router.push("/")}>Save Place</button>
        </InputWrapper>
      </EntryForm>
    </div>
  );
}

const EntryForm = styled.form`
  justify-content: center;
`;

const InputWrapper = styled.div`
  border: solid;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  height: 100%;
  margin-left: 10%;
  margin-right: 10%;
`;
