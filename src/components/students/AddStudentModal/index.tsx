import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { listClasses } from '@/api/classes/list';
import { IClass } from '@/models/classes/Class';
import { ICreateStudent } from '@/models/students/CreateStudent';
import {
  BlurOverlay,
  CloseButton,
  Form,
  FormInput,
  FormInputSubmit,
  FormLabel,
  FormLineDiv,
  FormSelect,
  ModalContainer,
  ModalTitle,
  Overlay,
  SelectOption,
} from './styles';

interface IProps {
  $isOpen: boolean;
  $onClose: () => void;
}

const AddStudentModal: React.FC<IProps> = (props) => {
  const { $isOpen, $onClose } = props;
  const [classes, setClasses] = useState<IClass[]>([]);
  const [hasClasses, setHasClasses] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICreateStudent>({
    name: '',
    studentNumber: '',
    birthDate: '',
    gender: 'feminine',
    email: '',
    phone: '',
    classId: 0,
  });

  useEffect(() => {
    const getClasses = async () => {
      try {
        const data = await listClasses();

        if (data.classes != null && Array.isArray(data.classes)) {
          setClasses(data.classes);
          if (data.classes.length > 0) setHasClasses(true);
        } else {
          console.error(
            'A resposta da API não possui um array de classes:',
            data
          );
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
      }
    };

    getClasses();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getFormattedBirthDate = (birthDate: string) => {
    const date = new Date(birthDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleBirthDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: getFormattedBirthDate(value),
    }));
  };

  const handleSelectGenderChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleSelectClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      classId: parseInt(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataSubmit = new FormData(e.currentTarget);
    const formValues: ICreateStudent = {
      name: '',
      studentNumber: '',
      birthDate: '',
      gender: '',
      email: '',
      phone: '',
      classId: 0,
    };

    formDataSubmit.forEach((value, key) => {
      switch (key) {
        case 'name':
        case 'studentNumber':
        case 'gender':
        case 'email':
        case 'phone':
          formValues[key] = value.toString();
          break;
        case 'birthDate':
          formValues[key] = getFormattedBirthDate(value.toString());
          break;
        case 'classId':
          formValues[key] = parseInt(value.toString());
          break;
        default:
          break;
      }
    });

    console.log(formValues);

    setFormData(formValues);
  };

  return (
    <>
      <Overlay $isOpen={$isOpen} />
      {$isOpen && <BlurOverlay />}
      <ModalContainer $isOpen={$isOpen}>
        <CloseButton onClick={$onClose}>X</CloseButton>
        <ModalTitle>Adicionar aluno(a)</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <FormLineDiv>
            <FormLabel>Nome</FormLabel>
            <FormInput
              type="text"
              name="name"
              placeholder="Digite seu nome"
              onBlur={handleInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Número de estudante</FormLabel>
            <FormInput
              type="text"
              name="studentNumber"
              placeholder="Digite seu nro de estudante"
              onBlur={handleInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Data de nascimento</FormLabel>
            <FormInput
              type="date"
              name="birthDate"
              onBlur={handleBirthDateInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Sexo</FormLabel>
            <FormSelect name="gender" onChange={handleSelectGenderChange}>
              <SelectOption key="feminine" value="feminine">
                Feminino
              </SelectOption>
              <SelectOption key="masculine" value="masculine">
                Masculino
              </SelectOption>
              <SelectOption key="non_binary" value="non_binary">
                Não binário
              </SelectOption>
              <SelectOption key="others" value="others">
                Outros
              </SelectOption>
            </FormSelect>
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              onBlur={handleInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Telefone</FormLabel>
            <FormInput
              type="number"
              name="phone"
              onBlur={handleInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Classe</FormLabel>
            {!hasClasses ? (
              <p>Ainda não há classes cadastradas</p>
            ) : (
              <FormSelect name="classId" onChange={handleSelectClassChange}>
                {classes.map((c) => (
                  <SelectOption key={c.id} value={c.id}>
                    {c.name}
                  </SelectOption>
                ))}
              </FormSelect>
            )}
          </FormLineDiv>

          <FormInputSubmit
            type="submit"
            value="Adicionar"
            disabled={!hasClasses}
          />
        </Form>
      </ModalContainer>
    </>
  );
};

export default AddStudentModal;
