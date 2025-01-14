import {useState, useEffect} from 'react';
import {userService} from '@services/userService';
import {authenticationService} from '@services/authenticationService';
import type UserModel from '@models/UserModel';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    const subscription = authenticationService.currentUser.subscribe((user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll().toPromise();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const deleteUser = (id: number) => {
    userService.delete(id).subscribe(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <>
      <h1>Hi {currentUser?.firstName}!</h1>
      <p>You're logged in with Angular 7!!</p>
      <h3>All registered users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.firstName} {user.lastName})
            <a onClick={() => deleteUser(user.id)} className='text-danger'>
              Delete
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
