import { listClasses } from '@/api/classes/list';
import Header from '@/components/Header';
import ClassModal from '@/components/classes/ClassModal';
import ClassesTable from '@/components/classes/ClassesTable';
import { IClass } from '@/models/classes/Class';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { AddButton, PrincipalDiv, Title, TitleContent } from './styles';

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    document.body.style.overflow = 'hidden';
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    document.body.style.overflow = 'auto';
    setIsAddModalOpen(false);
    getClasses();
  };

  const getClasses = useCallback(async () => {
    try {
      const data = await listClasses();

      if (data.classes != null && Array.isArray(data.classes)) {
        setClasses(data.classes);
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
    getClasses();
  }, [getClasses]);

  return (
    <PrincipalDiv>
      <Header />
      <TitleContent>
        <Title>Lista de classes</Title>
        <AddButton onClick={openAddModal}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </TitleContent>
      <ClassesTable $classes={classes} $getClasses={getClasses}></ClassesTable>
      {isAddModalOpen && (
        <ClassModal
          $isOpen={isAddModalOpen}
          $onClose={closeAddModal}
          title="Adicionar classe"
        />
      )}
    </PrincipalDiv>
  );
};

export default Classes;
