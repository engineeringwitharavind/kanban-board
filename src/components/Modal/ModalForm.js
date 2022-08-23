import React from 'react';
import styled from 'styled-components';
import Button from '@components/Button';
import { generateID } from '@utils';

function ModalForm({ submittedTaskData }) {
  const titleRef = React.createRef();
  const categoryRef = React.createRef();
  const descriptionRef = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    submittedTaskData({
      id: generateID(),
      title: titleRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <LabelWrapper>
        Task
        <Input
          ref={titleRef}
          type="text"
          placeholder="Enter your task name"
          required
        />
      </LabelWrapper>
      <LabelWrapper>
        Category
        <Select ref={categoryRef} type="text" placeholder="Select category">
          <Option>Frontend</Option>
          <Option>Design</Option>
          <Option>Services</Option>
          <Option>Architecture</Option>
        </Select>
      </LabelWrapper>
      <LabelWrapper>
        Description
        <TextArea
          ref={descriptionRef}
          placeholder="Enter your description (Limited to 100 Characters)"
          required
          maxLength={100}
        />
      </LabelWrapper>
      <ButtonWrapper>
        <Button minWidth type="submit">
          Save
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LabelWrapper = styled.label`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

const Input = styled.input`
  padding: 8px;
`;

const Select = styled.select`
  padding: 8px;
`;

const Option = styled.option`
  padding: 4px;
`;

const TextArea = styled.textarea`
  resize: vertical;
  padding: 8px;
  min-height: 48px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`;

export default ModalForm;
