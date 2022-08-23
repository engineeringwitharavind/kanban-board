import styled from 'styled-components';
import { Plus, Trash } from 'react-feather';
import { COLORS } from '@constants';

function Button({
  children,
  icon,
  color,
  background,
  padding,
  border,
  ...delegated
}) {
  return (
    <ButtonWrapper
      {...delegated}
      style={{
        color: color,
        background: background,
        border: border,
        padding: padding,
      }}
    >
      {children}
      {icon === 'Plus' && <Plus size={16} />}
      {icon === 'Trash' && <Trash size={16} />}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  margin: 0;
  font-size: 1rem;
  border: ${(props) => (props.border ? `2px solid ${COLORS.primary}` : 'none')};
  padding: ${(props) => (props.padding ? props.padding : '4px 8px')};
  color: ${(props) => (props.color ? props.color : COLORS.text)};
  background: ${(props) =>
    props.background ? props.background : COLORS.primary};
  min-width: ${(props) => (props.minWidth ? '140px' : 'none')};
  &:hover {
    cursor: pointer;
    background: ${COLORS.hover};
  }
`;

export default Button;
