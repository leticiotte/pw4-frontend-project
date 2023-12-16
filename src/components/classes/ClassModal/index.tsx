import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { addClass } from '@/api/classes/add';
import { updateClass } from '@/api/classes/update';
import { IClass } from '@/models/classes/Class';
import { IClassWithouId } from '@/models/classes/ClassWithouId';
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
  classSelected?: IClass;
}

const ClassModal: React.FC<IProps> = (props) => {
  const { $isOpen, $onClose, classSelected, title } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentClass, setCurrentClass] = useState<IClass>();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const keyInputRef = useRef<HTMLInputElement>(null);
  const courseInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (classSelected) {
      setIsEdit(true);
      setCurrentClass(classSelected);
    }
  }, [classSelected]);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.value = currentClass?.name || '';
    }
    if (keyInputRef.current) {
      keyInputRef.current.value = currentClass?.key || '';
    }
    if (courseInputRef.current) {
      courseInputRef.current.value = currentClass?.course || '';
    }
  }, [currentClass]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataSubmit = new FormData(e.currentTarget);
    const formValues: IClassWithouId = {
      name: '',
      key: '',
      course: '',
    };

    formDataSubmit.forEach((value, key) => {
      switch (key) {
        case 'name':
        case 'key':
        case 'course':
          formValues[key] = value.toString();
          break;
        default:
          break;
      }
    });
    console.log(formValues);

    if (isEdit) {
      try {
        if (classSelected != undefined && classSelected.id != undefined) {
          const data = await updateClass(classSelected.id, formValues);
          if (data.class != null) {
            successToast('Classe atualizado com sucesso!');
          } else {
            warningToast('Nenhuma mudança detectada!');
          }
        } else {
          errorToast('Algo deu errado ao atualizar classe');
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
        errorToast('Algo deu errado ao atualizar classe');
      }
    } else {
      try {
        const data = await addClass(formValues);
        if (data.class != null) {
          successToast('Classe criada com sucesso!');
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
        errorToast('Algo deu errado ao criar classe');
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
              placeholder="Digite o nome da classe"
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Chave</FormLabel>
            <FormInput
              ref={keyInputRef}
              type="text"
              name="key"
              placeholder="Digite a chave"
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Curso</FormLabel>
            <FormInput
              ref={courseInputRef}
              type="text"
              name="course"
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

export default ClassModal;
