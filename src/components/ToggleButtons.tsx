import React from 'react';
import styled from 'styled-components';

interface ToggleButtonsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  className?: string;
}

const Button = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#007bff' : '#f8f9fa')};
  border: 1px solid #007bff;
  color: ${props => (props.selected ? '#fff' : '#007bff')};
  padding: 25px 35px;
  cursor: pointer;
  flex: 1;
  border-radius: 20px;
  text-align: center;
  

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
     transform: scale(1.05);
  }
    

  &.active {
    background-color: #0056b3;
    color: #fff;
    font-weight : bold;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  }

  &.inactive {
    background-color: #f8f9fa;
    color: #007bff;
  }

  @media (min-width: 768px) {
    padding: 25px 35px;
  }

  @media (min-width: 1024px) {
    padding: 30px 45px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ options, selected, onSelect, className }) => {
  return (
    <ButtonWrapper className={className}>
      {options.map(option => (
        <Button
          key={option}
          selected={option === selected}
          onClick={() => onSelect(option)}
          className={option === selected ? 'active' : 'inactive'}
        >
          {option}
        </Button>
      ))}
    </ButtonWrapper>
  );
};

export default React.memo(ToggleButtons);
