import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { customFetch } from '../../utils/customFetch';
// import { Toast } from '../../components';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await customFetch.post('/auth/register', formData);
      // Toast('Registration Successful');
      setTimeout(() => {
        router.push('login');
      }, 2000);
      setFormData(initialState);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', error);
      // Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: Colors.primary }]}>
            REGISTER
          </Text>
        </View>

        <View style={{ marginTop: 50, width: 250, gap: 7 }}>
          {/* Name */}
          <View style={{ gap: 5 }}>
            <Text style={styles.labelText}>Name</Text>
            <View style={styles.input}>
              <FontAwesome name='user' size={24} color={'#fff'} />
              <TextInput
                style={styles.inputText}
                placeholder='name'
                value={formData.name}
                onChangeText={(value) => handleChange('name', value)}
              />
            </View>
          </View>

          {/* EMAIL */}
          <View style={{ gap: 5 }}>
            <Text style={styles.labelText}>Email</Text>
            <View style={styles.input}>
              <MaterialCommunityIcons name='email' size={24} color={'#fff'} />
              <TextInput
                style={styles.inputText}
                placeholder='email'
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={{ gap: 5 }}>
            <Text style={styles.labelText}>Password</Text>
            <View style={styles.input}>
              <MaterialCommunityIcons name='lock' size={24} color={'#fff'} />
              <TextInput
                secureTextEntry={true}
                placeholder='password'
                style={styles.inputText}
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
              />
            </View>
          </View>

          {/* SUBMIT BTN */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.lightGrey} />
            ) : (
              <Text style={styles.submitBtnText}>Register</Text>
            )}
          </TouchableOpacity>

          {!isLoading && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 15,
              }}
            >
              <Text style={{ letterSpacing: 1 }}>
                Already have an account ?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('login')}>
                <Text
                  style={{
                    color: Colors.primary,
                    letterSpacing: 1,
                    fontWeight: 'bold',
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  header: { alignItems: 'center', marginTop: 100, gap: 15 },
  headerText: { fontWeight: '600', fontSize: 24 },
  labelText: {
    fontSize: 15,
    letterSpacing: 1,
    color: Colors.mediumDark,
  },
  input: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  inputText: {
    letterSpacing: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: Colors.mediumDark,
    flex: 1,
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 3,
    padding: 8,
    marginTop: 10,
  },
  submitBtnText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Register;
