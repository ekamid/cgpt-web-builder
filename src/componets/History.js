import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import styled from "styled-components";

const History = ({ getPreviousCode }) => {
  const { history } = useContext(AppContext);
  return (
    <div>
      {history.length ? <Heading>History</Heading> : null}
      <List>
        {history.map((item, index) => (
          <Item
            color={item.active ? "#0000FF" : "#000000"}
            onClick={() => getPreviousCode(item.id)}
            key={index}
          >
            {item.command}
          </Item>
        ))}
      </List>
    </div>
  );
};

const Heading = styled.h4`
  font-size: 1.5rem;
  margin: 1rem 0;
  padding: 0 0 0 1rem;
  list-style: decimal;
`;

const List = styled.ol`
  font-size: 1.2rem;
  margin: 1rem 10px;
  padding: 0 0 0 2rem;
  list-style: decimal;
`;

const Item = styled.li`
  margin-bottom: 0.7rem;
  cursor: pointer;
  color: ${(props) => props.color || "#000"};

  &:hover {
    text-decoration: underline;
  }
`;

export default History;
