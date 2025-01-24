import { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import colors from '../globals/colors';
import { useNavigation } from '@react-navigation/native';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { setUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/auth';
import { loginSchema } from '../validaciones/loginSchema';
import { insertSession, deleteSession } from '../config/dbSqlite';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [error, setError] = useState('');
	const navigation = useNavigation();
	const [triggerSignIn] = useSignInMutation();
	const dispatch = useDispatch();

	const onSubmit = async () => {
		try {
			const trimmedEmail = email.trim();

			loginSchema.validateSync({ email: trimmedEmail, password });

			const response = await triggerSignIn({ email: trimmedEmail, password });

			const user = {
				localId: response.data.localId,
				email: response.data.email,
				idToken: response.data.idToken,
			};

			dispatch(setUser(user));
			await deleteSession();
			await insertSession(user.localId, user.email, user.idToken);
		} catch (error) {
			if (error.name === 'ValidationError') {
				switch (error.path) {
					case 'email':
						setEmailError(error.message);
						setPasswordError('');
						break;
					case 'password':
						setPasswordError(error.message);
						setEmailError('');
						break;
					default:
						setError(error.message);
						setEmailError('');
						setPasswordError('');
						break;
				}
			} else if (error.data) {
				setError(error.data.error || 'Error desconocido.');
			} else {
				setError('Error inesperado.');
			}
		}
	};

	const handleInputChange = (field, value) => {
		if (field === 'email') {
			setEmail(value);
			if (value === '') setEmailError('');
		} else if (field === 'password') {
			setPassword(value);
			if (value === '') setPasswordError('');
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Image
					source={require('../../assets/logo.png')}
					style={{
						width: 200,
						height: 200,
						alignSelf: 'center',
						marginTop: 90,
						marginBottom: 15,
					}}
				/>
				<InputForm
					label='Email'
					placeholder='Email'
					value={email}
					onChangeText={(t) => handleInputChange('email', t)}
					secureTextEntry={false}
					error={emailError}
				/>
				<InputForm
					label='Password'
					placeholder='Password'
					value={password}
					onChangeText={(t) => handleInputChange('password', t)}
					secureTextEntry={true}
					error={passwordError}
				/>
				{error ? <Text style={styles.error}>{error}</Text> : null}
				<SubmitButton
					title='Iniciar Sesión'
					onPress={onSubmit}
				/>
				<Text style={styles.account}>¿No tienes cuenta?</Text>
				<Pressable onPress={() => navigation.navigate('Register')}>
					<Text style={styles.register}>Regístrate</Text>
				</Pressable>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 18,
		backgroundColor: colors.secondary,
	},
	error: {
		color: colors.error,
		marginBottom: 12,
	},
	account: {
		textAlign: 'center',
		marginTop: 12,
	},
	register: {
		textAlign: 'center',
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default Login;
