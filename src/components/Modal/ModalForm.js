import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@components/Button';
import { generateID } from '@utils';

function ModalForm({ submittedTaskData, onDismiss, initialData }) {
  const titleRef = React.useRef();
  const categoryRef = React.useRef();
  const descriptionRef = React.useRef();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      titleRef.current.value = initialData.title;
      categoryRef.current.value = initialData.category;
      descriptionRef.current.value = initialData.description;
    } else {
      titleRef.current.value = '';
      categoryRef.current.value = '';
      descriptionRef.current.value = '';
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!titleRef.current.value || !descriptionRef.current.value) {
      setError(true);
      return;
    }
    submittedTaskData({
      id: initialData ? initialData.id : generateID(),
      title: titleRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    });
    setError(false);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.3 }}
      onClick={stopPropagation}
    >
      <LabelWrapper>
        <Label htmlFor='task-title'>Task</Label>
        <Input
          id='task-title'
          ref={titleRef}
          type='text'
          placeholder='Enter task name'
          required
          aria-required='true'
          onClick={stopPropagation}
        />
      </LabelWrapper>
      <LabelWrapper>
        <Label htmlFor='task-category'>Category</Label>
        <Select
          id='task-category'
          ref={categoryRef}
          defaultValue=''
          required
          aria-required='true'
          onClick={stopPropagation}
        >
          <option value='' disabled>
            Select category
          </option>
          <option value='Frontend'>Frontend</option>
          <option value='Design'>Design</option>
          <option value='Services'>Services</option>
          <option value='Architecture'>Architecture</option>
        </Select>
      </LabelWrapper>
      <LabelWrapper>
        <Label htmlFor='task-description'>Description</Label>
        <TextArea
          id='task-description'
          ref={descriptionRef}
          placeholder='Enter description (max 100 characters)'
          required
          maxLength={100}
          aria-required='true'
          aria-describedby='description-hint'
          onClick={stopPropagation}
        />
        <Hint id='description-hint'>Limited to 100 characters</Hint>
      </LabelWrapper>
      <ButtonWrapper>
        <Button type='submit' variant='primary' aria-label='Save task'>
          Save
        </Button>
        <Button
          variant='secondary'
          onClick={onDismiss}
          aria-label='Cancel task creation'
        >
          Cancel
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
}

const FormWrapper = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const LabelWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

const Label = styled.span`
  font-weight: var(--font-weight-medium);
`;

const Input = styled.input`
  padding: var(--spacing-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--color-accent);
    outline: none;
  }

  &::placeholder {
    color: var(--color-gray500);
  }
`;

const Select = styled.select`
  padding: var(--spacing-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--color-accent);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: var(--spacing-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--color-accent);
    outline: none;
  }

  &::placeholder {
    color: var(--color-gray500);
  }
`;

const Hint = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-gray500);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-sm);
`;

export default ModalForm;
