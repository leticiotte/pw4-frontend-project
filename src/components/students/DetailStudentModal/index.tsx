import { addStudentSubject } from '@/api/students/subjects/add';
import { deleteStudentSubject } from '@/api/students/subjects/delete';
import { listStudentSubjects } from '@/api/students/subjects/list';
import { listSubjects } from '@/api/subjects/list';
import { IStudentWithDetails } from '@/models/students/StudentWithDetails';
import { ISubject } from '@/models/subjects/Subject';
import { errorToast, successToast } from '@/utils/toastUtils';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  AddSubjectButton,
  BlurOverlay,
  CloseButton,
  DeleteSubjectButton,
  ModalContainer,
  ModalContent,
  ModalTitle,
  Overlay,
  SubjectsTable,
} from './styles';

interface IProps {
  $isOpen: boolean;
  $onClose: () => void;
  $student: IStudentWithDetails;
}

interface IDeleteSubject {
  studentId: number;
  subjectId: number;
  subjectName: string;
}

interface IAddSubject {
  studentId: number;
  subjectId: number;
}

const imageStyle = {
  borderRadius: '0.375rem',
};

function getGender(gender: string) {
  switch (gender) {
    case 'feminine':
      return 'feminino';
    case 'masculine':
      return 'masculino';
    case 'non_binary':
      return 'não binário';
    default:
      return 'outros';
  }
}

const DetailStudentModal: React.FC<IProps> = (props) => {
  const { $isOpen, $onClose, $student } = props;

  const [forceUpdate, setForceUpdate] = useState(false);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [subjectsLength, setSubjectsLength] = useState<number>(0);
  const [studentSubjects, setStudentSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const data = await listSubjects();

        if (data.subjects != null && Array.isArray(data.subjects)) {
          setSubjects(data.subjects);
          setSubjectsLength(data.subjects.length);
        } else {
          console.error(
            'A resposta da API não possui um array de matérias:',
            data
          );
        }
      } catch (error: any) {
        console.error('Erro na requisição:', error.message);
      }
    };

    getSubjects();
  }, []);

  const getStudentSubjects = useCallback(async () => {
    try {
      const data = await listStudentSubjects($student.id);

      if (data.subjects != null && Array.isArray(data.subjects)) {
        setStudentSubjects(data.subjects);
      } else {
        console.error(
          'A resposta da API não possui um array de matérias:',
          data
        );
      }
    } catch (error: any) {
      console.error('Erro na requisição:', error.message);
    } finally {
      setForceUpdate((prev) => !prev);
    }
  }, [$student.id]);

  useEffect(() => {
    getStudentSubjects();
  }, [$student.id, getStudentSubjects, forceUpdate]);

  const handleDelete = async (data: IDeleteSubject) => {
    const isConfirmed = window.confirm(
      `Tem certeza que deseja excluir a matéria ${data.subjectName}?`
    );

    if (isConfirmed) {
      await deleteSubject(data);
      successToast('Matrícula cancelada com sucesso');
    }
  };

  const deleteSubject = async (data: IDeleteSubject) => {
    try {
      await deleteStudentSubject(data.studentId, data.subjectId);
      getStudentSubjects();
    } catch (error: any) {
      console.error('Erro ao excluir o item:', error.message);
      errorToast('Erro ao excluir matéria do aluno');
    }
  };

  const handleAdd = async (data: IAddSubject) => {
    await addSubject(data);
    successToast('Matrícula realizada com sucesso');
  };

  const addSubject = async (data: IAddSubject) => {
    try {
      await addStudentSubject(data.studentId, data.subjectId);
      getStudentSubjects();
    } catch (error: any) {
      console.error('Erro ao excluir o item:', error.message);
    }
  };

  return (
    <>
      <Overlay $isOpen={$isOpen} />
      {$isOpen && <BlurOverlay />}
      <ModalContainer $isOpen={$isOpen}>
        <CloseButton onClick={$onClose}>X</CloseButton>
        <ModalTitle>Detalhes do aluno(a)</ModalTitle>
        <Image
          src={
            $student.image != null
              ? $student.image
              : 'https://randomuser.me/api/portraits/women/99.jpg'
          }
          alt="imagem"
          height={300}
          width={300}
          priority
          style={imageStyle}
        />
        <ModalContent>
          <p>Nome: {$student.name}</p>
          <p>Número da matrícula: {$student.studentNumber}</p>
          <p>Data de nascimento: {$student.birthDate}</p>
          <p>Sexo: {getGender($student.gender)}</p>
          <p>Email: {$student.email}</p>
          <p>Telefone: {$student.phone}</p>
          <p>Classe: {$student.class.name}</p>
          <hr></hr>
          <p>Matérias</p>
          {subjectsLength == 0 ? (
            <p>Ainda não há matérias cadastrada</p>
          ) : (
            <SubjectsTable>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>{subject.description}</td>
                    <td>
                      <AddSubjectButton
                        onClick={() =>
                          handleAdd({
                            studentId: $student.id,
                            subjectId: subject.id,
                          })
                        }
                        disabled={studentSubjects.some(
                          (studentSubject) => studentSubject.id === subject.id
                        )}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </AddSubjectButton>
                      <DeleteSubjectButton
                        onClick={() =>
                          handleDelete({
                            studentId: $student.id,
                            subjectId: subject.id,
                            subjectName: subject.name,
                          })
                        }
                        disabled={
                          !studentSubjects.some(
                            (studentSubject) => studentSubject.id === subject.id
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteSubjectButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </SubjectsTable>
          )}
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default DetailStudentModal;
