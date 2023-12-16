import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { listClasses } from '@/api/classes/list';
import { addStudent } from '@/api/students/add';
import { updateStudent } from '@/api/students/update';
import { IClass } from '@/models/classes/Class';
import { IStudentWithDetails } from '@/models/students/StudentWithDetails';
import { IStudentWithoutId } from '@/models/students/StudentWithoutId';
import { successToast, warningToast } from '@/utils/toastUtils';
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
  title: string;
  student?: IStudentWithDetails;
}

const StudentModal: React.FC<IProps> = (props) => {
  const { $isOpen, $onClose, student, title } = props;
  const [classes, setClasses] = useState<IClass[]>([]);
  const [hasClasses, setHasClasses] = useState<boolean>(false);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(
    undefined
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentStudent, setCurrentStudent] = useState<IStudentWithDetails>();
  const [formData, setFormData] = useState<IStudentWithoutId>({
    name: '',
    studentNumber: '',
    birthDate: '',
    gender: 'feminine',
    email: '',
    phone: '',
    classId: 0,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const studentNumberInputRef = useRef<HTMLInputElement>(null);
  const birthDateInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (student) {
      setIsEdit(true);
      setCurrentStudent(student);
    }
  }, [student]);

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

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.value = currentStudent?.name || '';
    }
    if (studentNumberInputRef.current) {
      studentNumberInputRef.current.value = currentStudent?.studentNumber || '';
    }
    if (birthDateInputRef.current) {
      birthDateInputRef.current.value = currentStudent?.birthDate
        ? getFormatBirthDateToISODate(currentStudent?.birthDate)
        : '';
    }
    if (genderInputRef.current) {
      if (currentStudent?.gender != undefined) {
        genderInputRef.current.value = currentStudent?.gender || '';
      }
    }
    if (emailInputRef.current) {
      emailInputRef.current.value = currentStudent?.email || '';
    }
    if (phoneInputRef.current) {
      phoneInputRef.current.value = currentStudent?.phone || '';
    }
    if (currentStudent?.classId != undefined) {
      setSelectedClassId(currentStudent.classId.toString());
    }
  }, [currentStudent]);

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

    date.setDate(date.getDate() + 1);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getFormatBirthDateToISODate = (birthDate: string) => {
    const parts = birthDate.split('/');

    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    return formattedDate;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataSubmit = new FormData(e.currentTarget);
    const formValues: IStudentWithoutId = {
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

    setFormData(formValues);
    const studentTransformed: IStudentWithoutId = {
      name: formValues.name,
      studentNumber: formValues.studentNumber,
      birthDate: formValues.birthDate,
      gender: formValues.gender,
      email: formValues.email,
      phone: formValues.phone,
      classId: formValues.classId,
    };
    if (isEdit) {
      try {
        if (student != undefined && student.id != undefined) {
          const data = await updateStudent(student.id, studentTransformed);
          if (data.student != null) {
            successToast('Aluno atualizado com sucesso!');
          } else {
            warningToast('Nenhuma mudança detectada!');
          }
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
      }
    } else {
      try {
        const data = await addStudent(studentTransformed);
        if (data.student != null) {
          successToast('Aluno criado com sucesso!');
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
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
              placeholder="Digite seu nome"
              onBlur={handleInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Número de estudante</FormLabel>
            <FormInput
              ref={studentNumberInputRef}
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
              ref={birthDateInputRef}
              type="date"
              name="birthDate"
              onBlur={handleBirthDateInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Sexo</FormLabel>
            <FormSelect
              ref={genderInputRef}
              name="gender"
              onChange={handleSelectGenderChange}
              defaultValue="feminine"
            >
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
              ref={emailInputRef}
              type="email"
              name="email"
              onBlur={handleInputChange}
              required
            />
          </FormLineDiv>
          <FormLineDiv>
            <FormLabel>Telefone</FormLabel>
            <FormInput
              ref={phoneInputRef}
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
              <FormSelect
                value={selectedClassId}
                name="classId"
                onChange={handleSelectClassChange}
              >
                {classes.map((c) => (
                  <SelectOption key={c.id.toString()} value={c.id.toString()}>
                    {c.name}
                  </SelectOption>
                ))}
              </FormSelect>
            )}
          </FormLineDiv>

          <FormInputSubmit
            type="submit"
            value="Salvar"
            disabled={!hasClasses}
          />
        </Form>
      </ModalContainer>
    </>
  );
};

export default StudentModal;
