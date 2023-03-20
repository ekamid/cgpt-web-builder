import styled from "styled-components";

const PreviousInstruction = () => {
  return (
    <div>
      <InstructionList>
        <InstructionListItem>Preheat the oven to 350°F.</InstructionListItem>
        <InstructionListItem>
          In a mixing bowl, whisk together the flour, sugar, and salt.
        </InstructionListItem>
        <InstructionListItem>
          Add the eggs, one at a time, whisking well after each addition.
        </InstructionListItem>
        <InstructionListItem>
          Stir in the melted butter and vanilla extract.
        </InstructionListItem>
        <InstructionListItem>
          Pour the batter into a greased 9-inch baking pan.
        </InstructionListItem>
        <InstructionListItem>
          Bake for 35-40 minutes, or until golden brown and a toothpick inserted
          in the center comes out clean.
        </InstructionListItem>
        <InstructionListItem>
          Let cool for 10 minutes before slicing and serving.
        </InstructionListItem>
      </InstructionList>
    </div>
  );
};

const InstructionList = styled.ol`
  font-size: 1.2rem;
  margin: 1rem 0;
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
