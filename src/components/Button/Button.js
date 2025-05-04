import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Plus, Trash, X } from 'react-feather';

const variantStyles = {
  primary: css`
    background: var(--color-accent);
    color: var(--color-white);
    &:hover:not(:disabled) {
      filter: brightness(1.1);
    }
  `,
  danger: css`
    background: var(--color-danger);
    color: var(--color-white);
    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
  secondary: css`
    background: transparent;
    color: var(--color-text-primary);
    &:hover:not(:disabled) {
      background: var(--color-gray900);
    }
  `,
};

function Button({
  children,
  icon,
  variant = 'primary',
  disabled = false,
  ...delegated
}) {
  return (
    <ButtonWrapper
      as={motion.button}
      variants={variantStyles}
      variant={variant}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...delegated}
    >
      {icon === 'Plus' && <Plus size={16} aria-hidden='true' />}
      {icon === 'Trash' && <Trash size={16} aria-hidden='true' />}
      {icon === 'X' && <X size={24} aria-hidden='true' />}
      {children && <ButtonText>{children}</ButtonText>}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);
  padding: ${({ variant }) =>
    variant === 'secondary'
      ? 'var(--spacing-sm)'
      : 'var(--spacing-sm) var(--spacing-md)'};
  border-radius: 10px;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease, filter 0.2s ease;
  ${({ variants, variant }) => variants[variant]}

  &:disabled {
    background: var(--color-disabled);
    color: var(--color-gray500);
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &[aria-label*='Close'] {
    min-width: 44px;
    min-height: 44px;
    padding: var(--spacing-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ButtonText = styled.span`
  font-size: var(--font-size-xs);
`;

export default Button;
