import type UserModel from '@models/UserModel';

const UserComponent = ({deleteUser, user}: {deleteUser: (id: number) => void; user: UserModel}) => {
  return (
    <li key={user.id}>
      {user.username} ({user.firstName} {user.lastName})
      <a onClick={() => deleteUser(user.id)} className='text-danger'>
        Delete
      </a>
    </li>
  );
};

export default UserComponent;
