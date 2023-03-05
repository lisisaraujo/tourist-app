import {
  RiDeleteBinLine,
  RiPencilLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import styled from "styled-components";

import Image from "next/image";

export default function Card({ cardList }) {
  return (
    <CardWrapper>
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
    </CardWrapper>
  );
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
