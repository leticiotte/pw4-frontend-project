import { deleteSubject } from '@/api/subjects/delete';
import { ISubject } from '@/models/subjects/Subject';
import { errorToast, successToast } from '@/utils/toastUtils';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SubjectModal from '../SubjectModal';
import { DeleteButton, EditButton, PrincipalDiv, Table } from './styles';

interface IProps {
  $subjects: ISubject[];
  $getSubjects: () => void;
}

interface IDeleteSubject {
  subjectId: number;
  subjectName: string;
}

const SubjectsTable: React.FC<IProps> = (props) => {
  const { $subjects, $getSubjects } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<ISubject>();

  const openEditModal = () => {
    document.body.style.overflow = 'hidden';
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    document.body.style.overflow = 'auto';
    setIsEditModalOpen(false);
    $getSubjects();
  };

  const handleEdit = (subjectId: number) => {
    const foundSubject = $subjects.find((subject) => subject.id == subjectId);

    if (foundSubject) {
      setSelectedSubject(foundSubject);
      openEditModal();
    }
  };

  const handleDelete = async (data: IDeleteSubject) => {
    const isConfirmed = window.confirm(
      `Tem certeza que deseja excluir a matéria ${data.subjectName}?`
    );

    if (isConfirmed) {
      await callDeleteSubject(data.subjectId);
    }
  };

  const callDeleteSubject = async (subjectId: number) => {
    try {
      await deleteSubject(subjectId);
      successToast('Matéria excluída com sucesso');
      $getSubjects();
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
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {$subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.name}</td>
                <td>{subject.description}</td>
                <td>
                  <EditButton onClick={() => handleEdit(subject.id)}>
                    <FontAwesomeIcon icon={faPencil} />
                  </EditButton>
                  <DeleteButton
                    onClick={() =>
                      handleDelete({
                        subjectId: subject.id,
                        subjectName: subject.name,
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
          <SubjectModal
            $isOpen={isEditModalOpen}
            $onClose={closeEditModal}
            subject={selectedSubject}
            title="Editar matéria"
          />
        )}
      </PrincipalDiv>
    </>
  );
};

export default SubjectsTable;
