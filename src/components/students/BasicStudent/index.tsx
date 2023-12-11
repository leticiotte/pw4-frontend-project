import { IStudent } from '@/models/students/Student';
import Image from 'next/image';
import React, { useState } from 'react';

import DetailStudentModal from '../DetailStudentModal';
import { DeleteButton, DetailButton, StudentDiv, StudentName } from './styles';

import { deleteStudent } from '@/api/students/delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  student: IStudent;
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

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
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
      toast.success('Aluno excluído com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      $getStudents();
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(
          `Erro ao excluir aluno: ${error.response.data.error.message}`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
        return;
      }
      toast.error('Erro ao excluir aluno', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
    </StudentDiv>
  );
};

export default BasicStudent;
