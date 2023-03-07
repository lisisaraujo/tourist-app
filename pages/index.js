import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { StyledButton } from "../components/Button/Button.styled";
import { useRouter } from "next/router";

export default function Home() {
  const [cardList, setCardList] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  function refreshPage() {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch("/api/cards");
      const cards = await data.json();
      setCardList(cards);
      setLoading(false);
    };
    fetchData().catch(console.error);
  }

  useEffect(() => {
    refreshPage();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!cardList) {
    return <h1>No data</h1>;
  }

  async function handleRemoveCard(id) {
    console.log("ANOTHER ONE", id);
    const response = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
    refreshPage();
  }

  async function handleUpdateCard(updatedCard, id) {
    const response = await fetch(`/api/cards/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCard),
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <BoardWrapper>
      <>
        {/* <Card cardList={cardList} /> */}
        <CardGrid>
          {cardList.map((card) => {
            // console.log(card);
            return (
              <Card
                onClick={() => router.push(`/${id}`)}
                key={card._id}
                name={card.name}
                image={card.image}
                location={card.location}
                description={card.description}
                onRemoveCard={() => handleRemoveCard(card._id)}
                onUpdateCard={handleUpdateCard}
                id={card._id}
              />
            );
          })}
        </CardGrid>
        <StyledButton type="button" onClick={() => router.push("/create")}>
          + places
        </StyledButton>
      </>
    </BoardWrapper>
  );
}
const BoardWrapper = styled.section`
  display: grid;
  grid-template-rows: min-content auto 48px;
  height: inherit;
`;
const CardGrid = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-content: start;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
`;
