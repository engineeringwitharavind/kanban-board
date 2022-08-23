import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@constants';

function TaskCard({ title, category, description }) {
  return (
    <CardWrapper>
      <Title>{title}</Title>
      <ColoredText>{category}</ColoredText>
      <Description>{description}</Description>
    </CardWrapper>
  );
}

const CardWrapper = styled.div``;

const Title = styled.h1`
  font-size: 16px;
`;

const ColoredText = styled.div`
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  text-align: center;
  pointer-events: none;
  color: ${COLORS.background};
  background: ${COLORS.secondary};
`;

const Description = styled.p`
  padding-bottom: 4px;
`;

export default TaskCard;
