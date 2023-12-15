import { listStudents } from '@/api/students/list';
import Header from '@/components/Header';
import BasicStudent from '@/components/students/BasicStudent';
import StudentModal from '@/components/students/StudentModal';
import { IStudentWithDetails } from '@/models/students/StudentWithDetails';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AddButton,
  PrincipalDiv,
  StudentsDiv,
  Title,
  TitleContent,
} from './styles';

const Students: React.FC = () => {
  const [students, setStudents] = useState<IStudentWithDetails[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    document.body.style.overflow = 'hidden';
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    document.body.style.overflow = 'auto';
    setIsAddModalOpen(false);
    getStudents();
  };

  const getStudents = useCallback(async () => {
    try {
      const data = await listStudents();

      if (data.students != null && Array.isArray(data.students)) {
        setStudents(data.students);
      } else {
        console.error(
          'A resposta da API não possui um array de estudantes:',
          data
        );
      }
    } catch (error: any) {
      console.error('Erro na requisição:', error.message);
    }
  }, []);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <PrincipalDiv>
      <Header />
      <TitleContent>
        <Title>Lista de Estudantes</Title>
        <AddButton onClick={openAddModal}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </TitleContent>
      <StudentsDiv>
        {students.map((student, index) => (
          <BasicStudent
            key={student.id}
            student={student}
            imageId={index < 100 ? index : 0}
            $getStudents={getStudents}
          />
        ))}{' '}
      </StudentsDiv>
      {isAddModalOpen && (
        <StudentModal
          $isOpen={isAddModalOpen}
          $onClose={closeAddModal}
          title="Adicionar aluno(a)"
        />
      )}
    </PrincipalDiv>
  );
};

export default Students;
