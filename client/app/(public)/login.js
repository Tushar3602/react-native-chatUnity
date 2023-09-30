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
import { useRouter } from 'expo-router';
import { Toast } from '../../components';
import { customFetch } from '../../utils/customFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { email: '', password: '' };

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch.post('/auth/login', formData);

      await AsyncStorage.setItem('token', data.token);
      Toast('Login Successful');
      setTimeout(() => {
        router.push('home');
      }, 2000);
      setFormData(initialState);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', error);
      Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: Colors.primary }]}>
            SIGN IN
          </Text>
        </View>

        <View style={{ marginTop: 80, width: 250, gap: 7 }}>
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
              <Text style={styles.submitBtnText}>Login</Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,
            }}
          >
            <Text style={{ letterSpacing: 1 }}>Don't have an account ? </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: Colors.primary,
                  letterSpacing: 1,
                  fontWeight: 'bold',
                }}
                onPress={() => router.push('register')}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
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
  header: { alignItems: 'center', marginTop: 80, gap: 15 },
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

export default Login;
