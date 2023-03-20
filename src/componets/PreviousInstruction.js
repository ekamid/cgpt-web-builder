import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import styled from "styled-components";

const PreviousInstruction = ({ getPreviousCode }) => {
  const { history } = useContext(AppContext);
  return (
    <div>
      {history.length ? <Heading>Previous Instructions</Heading> : null}
      <InstructionList>
        {history.map((item, index) => (
          <InstructionListItem
            onClick={() => getPreviousCode(item.id)}
            key={index}
          >
            {item.command}
          </InstructionListItem>
        ))}
      </InstructionList>
    </div>
  );
};

const Heading = styled.h4`
  font-size: 1.5rem;
  margin: 1rem 0;
  padding: 0 0 0 1rem;
  list-style: decimal;
`;

const InstructionList = styled.ol`
  font-size: 1.2rem;
  margin: 1rem 10px;
  padding: 0 0 0 2rem;
  list-style: decimal;
`;

const InstructionListItem = styled.li`
  margin-bottom: 0.7rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default PreviousInstruction;
