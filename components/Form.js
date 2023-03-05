import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Form() {
  const cards = useSWR("/api/cards");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newCard = Object.fromEntries(formData);
    console.log(newCard);

    const response = await fetch("/api/cards/create", {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      cards.mutate();

      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }

    event.target.reset();
  }

  return (
    <EntryForm onSubmit={handleSubmit}>
      <InputWrapper>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="fname" />
        <label htmlFor="image-url">Image Url:</label>
        <input type="text" id="image-url" name="image-url" />
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" />
        <label htmlFor="map-location">Map Location:</label>
        <input type="text" id="map-location" name="map-location" />
        <label htmlFor="description">Description:</label>
        <input type="text" id="map-location" name="map-location" />
        <button onClick={() => router.push(`/`)}>Save Place</button>
      </InputWrapper>
    </EntryForm>
  );
}

const EntryForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 70px;
  position: fixed;
  bottom: 0;
`;

const InputWrapper = styled.div`
  width: calc(100% - 100px);
  display: flex;
  justify-content: space-around;

  input {
    border: none;
    padding: 10px;
    border-top: 2px solid #252629;
    height: 100%;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #fe4b13;
  border: none;
  border-radius: 7px;

  svg {
    height: 48px;
    width: 48px;
  }
`;
