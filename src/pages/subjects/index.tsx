import { listSubjects } from '@/api/subjects/list';
import Header from '@/components/Header';
import SubjectModal from '@/components/subjects/SubjectModal';
import SubjectsTable from '@/components/subjects/SubjectsTable';
import { ISubject } from '@/models/subjects/Subject';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { AddButton, PrincipalDiv, Title, TitleContent } from './styles';

const Students: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    document.body.style.overflow = 'hidden';
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    document.body.style.overflow = 'auto';
    setIsAddModalOpen(false);
    getSubjects();
  };

  const getSubjects = useCallback(async () => {
    try {
      const data = await listSubjects();

      if (data.subjects != null && Array.isArray(data.subjects)) {
        setSubjects(data.subjects);
      } else {
        console.error(
          'A resposta da API não possui um array de matérias:',
          data
        );
      }
    } catch (error: any) {
      console.error('Erro na requisição:', error.message);
    }
  }, []);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  return (
    <PrincipalDiv>
      <Header />
      <TitleContent>
        <Title>Lista de matérias</Title>
        <AddButton onClick={openAddModal}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </TitleContent>
      <SubjectsTable
        $subjects={subjects}
        $getSubjects={getSubjects}
      ></SubjectsTable>
      {isAddModalOpen && (
        <SubjectModal
          $isOpen={isAddModalOpen}
          $onClose={closeAddModal}
          title="Adicionar matéria"
        />
      )}
    </PrincipalDiv>
  );
};

export default Students;
