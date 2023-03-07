import {
  RiDeleteBinLine,
  RiPencilLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Card({
  name,
  location,
  image,
  mapURL,
  onRemoveCard,
  onUpdateCard,
  id,
  description,
}) {
  const [isEditing, setIsEditing] = useState(false);
  // console.log("++++++++++++", id);

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formElements = event.target.elements;

    const updatedCard = {
      name: formElements.name.value,
      location: formElements.location.value,
      image: formElements.image.value,
      mapURL: formElements.mapURL.value,
      description: formElements.description.value,
      id: id,
    };
    onUpdateCard(updatedCard, id);
    console.log("idididiidid", id);
    setIsEditing(false);
  }

  return (
    <CardWrapper>
      {isEditing && (
        <form
          onSubmit={() => {
            handleSubmit;
          }}
        >
          <label htmlFor="name">Name</label>
          <input id="name" name="name" defaultValue={name}></input>
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" defaultValue={image}></input>
          <label htmlFor="location">Location</label>
          <input id="location" name="location" defaultValue={location}></input>
          <label htmlFor="mapURL">Map URL</label>
          <input id="mapURL" name="mapURL" defaultValue={mapURL}></input>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            defaultValue={description}
          ></input>
          <button onClick={() => router.push("/")}>Save Changes</button>
        </form>
      )}
      {!isEditing && (
        <>
          <h2>{name}</h2>
          <Image src={image} height={500} width={400} alt={name}></Image>
          <p>{location}</p>
          <DeleteIcon onClick={() => onRemoveCard(id)} />
          <EditIcon onClick={() => setIsEditing(true)} />
        </>
      )}
    </CardWrapper>
  );
}

{
  /* <CardWrapper>
{cardList.map((card) => (
  <section className="card" key={card._id}>
    <h2>{card.name}</h2>
    <Image
      src={card.image}
      height={500}
      width={400}
      alt={card.name}
    ></Image>
    <p>{card.location}</p>
  </section>
))}
</CardWrapper> */
}

const CardWrapper = styled.li`
  margin: 0 10px 0 10px;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  padding: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  position: relative;
`;

const Text = styled.p`
  overflow-wrap: break-word;
  width: 90%;
  color: #252629;
  font-size: 1.3rem;
  margin: 0.7rem 0 0.7rem 0;
`;

const Name = styled.div`
  text-transform: uppercase;
  overflow-wrap: break-word;
  font-size: 1rem;
  margin-top: 10px;
  color: #252629;
`;

const DeleteIcon = styled(RiDeleteBinLine)`
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  right: 20px;
  color: #fe4b13;
`;

const EditIcon = styled(RiPencilLine)`
  position: absolute;
  top: 50px;
  width: 20px;
  height: 20px;
  right: 20px;
  color: #fe4b13;
`;

const SaveButton = styled(RiCheckboxCircleLine)`
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  right: 20px;
  color: #fe4b13;
`;

const Button = styled.button`
  background-color: white;
  color: #fe4b13;
  border: none;
  border-radius: 7px;
`;
