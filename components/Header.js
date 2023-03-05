import styled from "styled-components";

export default function Header() {
  return (
    <nav>
      <Headline className="Headline">Tour Guide</Headline>
    </nav>
  );
}

const Headline = styled.h1`
  color: #252629;
  text-align: center;
  display: flex;
  position: fixed;
  z-index: 1;
`;
