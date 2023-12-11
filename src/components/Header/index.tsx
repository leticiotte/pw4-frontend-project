import Link from 'next/link';
import React from 'react';
import { HeaderContainer, Navigation } from './styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Navigation>
        <Link href="/students">Alunos</Link>
        <Link href="/subjects">Matérias</Link>
        <Link href="/classes">Classes</Link>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
