import { View, ActivityIndicator } from 'react-native';
import { customFetch } from '../../../utils/customFetch';
import { useState } from 'react';
import { useEffect } from 'react';
import { User } from '../../../components';
import Colors from '../../../constants/Colors';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch('/users/current-user');
      setCurrentUser(response.data.user);
      const { data } = await customFetch('/users/get-all-users');
      setUsers(data.users);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      // Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <View>
        {users.map((user) => {
          if (user._id === currentUser._id) return;
          return (
            <User
              key={user._id}
              {...user}
              fetchUsers={fetchUsers}
              currentUser={currentUser}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Home;
