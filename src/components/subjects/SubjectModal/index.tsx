import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { addSubject } from '@/api/subjects/add';
import { updateSubject } from '@/api/subjects/update';
import { ISubject } from '@/models/subjects/Subject';
import { ISubjectWithoutId } from '@/models/subjects/SubjectWithoutId';
import { errorToast, successToast, warningToast } from '@/utils/toastUtils';
import {
  BlurOverlay,
  CloseButton,
  Form,
  FormInput,
  FormInputSubmit,
  FormLabel,
  FormLineDiv,
  ModalContainer,
  ModalTitle,
  Overlay,
} from './styles';

interface IProps {
  $isOpen: boolean;
  $onClose: () => void;
  title: string;
  subject?: ISubject;
}

const SubjectModal: React.FC<IProps> = (props) => {
  const { $isOpen, $onClose, subject, title } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentSubject, setCurrentSubject] = useState<ISubject>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (subject) {
      setIsEdit(true);
      setCurrentSubject(subject);
    }
  }, [subject]);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.value = currentSubject?.name || '';
    }
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = currentSubject?.description || '';
    }
  }, [currentSubject]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataSubmit = new FormData(e.currentTarget);
    const formValues: ISubjectWithoutId = {
      name: '',
      description: '',
    };

    formDataSubmit.forEach((value, key) => {
      switch (key) {
        case 'name':
        case 'description':
          formValues[key] = value.toString();
          break;
        default:
          break;
      }
    });

    if (isEdit) {
      try {
        if (subject != undefined && subject.id != undefined) {
          const data = await updateSubject(subject.id, formValues);
          if (data.subject != null) {
            successToast('Matéria atualizado com sucesso!');
          } else {
            warningToast('Nenhuma mudança detectada!');
          }
        } else {
          errorToast('Algo deu errado ao atualizar matéria');
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
        errorToast('Algo deu errado ao atualizar matéria');
      }
    } else {
      try {
        const data = await addSubject(formValues);
        if (data.subject != null) {
          successToast('Matéria criada com sucesso!');
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
        errorToast('Algo deu errado ao criar matéria');
      }
    }
    $onClose();
  };

  return (
    <>
      <Overlay $isOpen={$isOpen} />
      {$isOpen && <BlurOverlay />}
      <ModalContainer $isOpen={$isOpen}>
        <CloseButton onClick={$onClose}>X</CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <FormLineDiv>
            <FormLabel>Nome</FormLabel>
            <FormInput
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Digite o nome da matéria"
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Descrição</FormLabel>
            <FormInput
              ref={descriptionInputRef}
              type="text"
              name="description"
              placeholder="Digite a descrição"
              required
            />
          </FormLineDiv>
          <FormInputSubmit type="submit" value="Salvar" />
        </Form>
      </ModalContainer>
    </>
  );
};

export default SubjectModal;
