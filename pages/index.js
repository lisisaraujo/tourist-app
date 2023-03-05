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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch("/api/cards");
      const cards = await data.json();
      setCardList(cards);
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!cardList) {
    return <h1>No data</h1>;
  }

  return (
    <BoardWrapper>
      <>
        <Card cardList={cardList} />
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
