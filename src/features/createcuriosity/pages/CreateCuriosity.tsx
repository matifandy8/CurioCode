import React from 'react';
import MainLayout from '../../../app/layouts/MainLayout';

const CreateCuriosity: React.FC = () => {
  return (
    <MainLayout>
      <div className='p-8'>
        <h1>Create Curiosity</h1>
        <p>This page is protected — only users (with the user token) or admins can access it.</p>
        <form>
          <div>
            <label>Title</label>
            <input placeholder="Title" />
          </div>
          <div>
            <label>Content</label>
            <textarea placeholder="Tell something curious..." />
          </div>
          <button type="button">Create</button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateCuriosity;
