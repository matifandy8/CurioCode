import React from 'react';
import CreateCuriosityForm from '../components/CreateCuriosityForm';

const CreateCuriosityPage: React.FC = () => {
  return (
      <div className='flex flex-col items-center justify-start min-h-screen p-8'>
        <h1 className='text-3xl font-bold text-cyan-300 mb-8'>Create Curiosity</h1>
        <CreateCuriosityForm />
      </div>
  );
};

export default CreateCuriosityPage;
