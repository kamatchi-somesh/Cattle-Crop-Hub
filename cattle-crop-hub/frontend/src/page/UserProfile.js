import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user.email) {
    toast('You have not logged in!');
    setTimeout(() => {
      navigate('/login');
    }, 10);
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-500 to-pink-500'>
    <div className="mx-auto max-w-4xl p-4 bg-blue-200 rounded-md">
      <h2 className="text-4xl font-bold mb-4">USER PROFILE</h2>
      <div className="flex justify-center mb-4">
        <img src={user.image} alt="User" className="h-40 w-40 rounded-full" />
      </div>
      <p className="mb-2 text-2xl">
        <span className="font-bold text-2xl">Name:</span> {user.firstName} {user.lastName}
      </p>
      <p className="mb-2 text-2xl">
        <span className="font-bold text-2xl">Email:</span> {user.email}
      </p>
      <p className="mb-2 text-2xl">
        <span className="font-bold text-2xl">Address:</span> {user.address}
      </p>
      <p className="mb-2 text-2xl">
        <span className="font-bold text-2xl">Phone:</span> {user.phone}
      </p>
    </div>
    </div>
  );
};

export default UserProfile;
