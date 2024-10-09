'use client';

import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '@/components/preloader/Preloader';
import { openLoginPopup } from '@/store/slices/popupSlice';

const Home: FC = () => {
  const dispatch = useDispatch();

  const handleJoinClick = () => {
    dispatch(openLoginPopup());
  };

  return <Preloader onJoin={handleJoinClick} />;
};

export default Home;
