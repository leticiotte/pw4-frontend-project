import { deleteClass } from '@/api/classes/delete';
import { IClass } from '@/models/classes/Class';
import { errorToast, successToast } from '@/utils/toastUtils';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ClassModal from '../ClassModal';
import { DeleteButton, EditButton, PrincipalDiv, Table } from './styles';

interface IProps {
  $classes: IClass[];
  $getClasses: () => void;
}

interface IDeleteClass {
  classId: number;
  className: string;
}

const ClassesTable: React.FC<IProps> = (props) => {
  const { $classes, $getClasses } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<IClass>();

  const openEditModal = () => {
    document.body.style.overflow = 'hidden';
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    document.body.style.overflow = 'auto';
    setIsEditModalOpen(false);
    $getClasses();
  };

  const handleEdit = (classId: number) => {
    const foundClass = $classes.find((c) => c.id == classId);

    if (foundClass) {
      setSelectedClass(foundClass);
      openEditModal();
    }
  };

  const handleDelete = async (data: IDeleteClass) => {
    const isConfirmed = window.confirm(
      `Tem certeza que deseja excluir a classe ${data.className}?`
    );

    if (isConfirmed) {
      await callDeleteClass(data.classId);
    }
  };

  const callDeleteClass = async (subjectId: number) => {
    try {
      await deleteClass(subjectId);
      successToast('Classe excluída com sucesso');
      $getClasses();
    } catch (error: any) {
      if (error.response && error.response.data) {
        errorToast(
          `Erro ao excluir aluno: ${error.response.data.error.message}`
        );
        return;
      }
      errorToast('Erro ao excluir aluno');
    }
  };

  return (
    <>
      <PrincipalDiv>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Chave</th>
              <th>Curso</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {$classes.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.key}</td>
                <td>{c.course}</td>
                <td>
                  <EditButton onClick={() => handleEdit(c.id)}>
                    <FontAwesomeIcon icon={faPencil} />
                  </EditButton>
                  <DeleteButton
                    onClick={() =>
                      handleDelete({
                        classId: c.id,
                        className: c.name,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isEditModalOpen && (
          <ClassModal
            $isOpen={isEditModalOpen}
            $onClose={closeEditModal}
            classSelected={selectedClass}
            title="Editar classe"
          />
        )}
      </PrincipalDiv>
    </>
  );
};

export default ClassesTable;
