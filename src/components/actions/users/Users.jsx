import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectedAllUsers, getUsersStatus, getUsersError } from '../../../store/slices/usersSlice';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectedAllUsers);
  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  if (usersStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (usersStatus === 'failed') {
    return <div>Error: {error}</div>;
  }
console.log(users)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users && users.map((user)=>{
            return <li>{user.firstName}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Users;
