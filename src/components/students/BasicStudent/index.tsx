import { IStudentWithDetails } from '@/models/students/StudentWithDetails';
import Image from 'next/image';
import React, { useState } from 'react';

import DetailStudentModal from '../DetailStudentModal';
import {
  DeleteButton,
  DetailButton,
  EditButton,
  StudentDiv,
  StudentName,
} from './styles';

import { deleteStudent } from '@/api/students/delete';
import { errorToast, successToast } from '@/utils/toastUtils';
import 'react-toastify/dist/ReactToastify.css';
import StudentModal from '../StudentModal';

interface IProps {
  student: IStudentWithDetails;
  imageId: number;
  $getStudents: () => void;
}

interface IDeleteStudent {
  studentId: number;
  studentName: string;
}

const imageStyle = {
  borderRadius: '0.375rem',
  border: '1px solid #333D29',
};

const BasicStudent: React.FC<IProps> = (props) => {
  const { imageId, student, $getStudents } = props;
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDetailModal = () => {
    document.body.style.overflow = 'hidden';
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    document.body.style.overflow = 'auto';
    setIsDetailModalOpen(false);
  };

  const openEditModal = () => {
    document.body.style.overflow = 'hidden';
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    document.body.style.overflow = 'auto';
    setIsEditModalOpen(false);
    $getStudents();
  };

  const handleDelete = async (data: IDeleteStudent) => {
    const isConfirmed = window.confirm(
      `Tem certeza que deseja excluir o aluno(a) ${data.studentName}?`
    );

    if (isConfirmed) {
      await callDeleteStudent(data.studentId);
    }
  };

  const callDeleteStudent = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
      successToast('Aluno excluído com sucesso');
      $getStudents();
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

  function getGender(gender: string) {
    return gender == 'feminine' ? 'women' : 'men';
  }

  const url: string = `https://randomuser.me/api/portraits/${getGender(
    student.gender
  )}/${imageId}.jpg`;
  student.image = url;

  return (
    <StudentDiv>
      <Image
        src={url}
        alt="imagem"
        height={300}
        width={300}
        priority
        style={imageStyle}
      />
      <StudentName>{student.name}</StudentName>
      <DetailButton onClick={openDetailModal}>Detalhes</DetailButton>
      <EditButton onClick={openEditModal}>Editar</EditButton>
      <DeleteButton
        onClick={() =>
          handleDelete({
            studentId: student.id,
            studentName: student.name,
          })
        }
      >
        Deletar
      </DeleteButton>

      {isDetailModalOpen && (
        <DetailStudentModal
          $isOpen={isDetailModalOpen}
          $onClose={closeDetailModal}
          $student={student}
        />
      )}

      {isEditModalOpen && (
        <StudentModal
          $isOpen={isEditModalOpen}
          $onClose={closeEditModal}
          student={student}
          title="Editar aluno(a)"
        />
      )}
    </StudentDiv>
  );
};

export default BasicStudent;
