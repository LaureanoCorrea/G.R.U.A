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
import { useSignUpMutation } from '../services/auth';
import { setUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { signUpSchema } from '../validaciones/signUpSchema';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const navigation = useNavigation();
	const [triggerSignup] = useSignUpMutation();
	const dispatch = useDispatch();

	const onSubmit = async () => {
		try {
			signUpSchema.validateSync({ email, password, confirmPassword });
			const response = await triggerSignup({
				email,
				password,
				confirmPassword,
			});
			const user = {
				email: response.data.email,
				idToken: response.data.idToken,
				localId: response.data.localId,
			};
			dispatch(setUser(user));
		} catch (error) {
			switch (error.path) {
				case 'email':
					setEmailError(error.message);
					break;
				case 'password':
					setPasswordError(error.message);
					break;
				case 'confirmPassword':
					setConfirmPasswordError(error.message);
					break;
				default:
					console.error(error.message);
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
		} else if (field === 'confirmPassword') {
			setConfirmPassword(value);
			if (value === '') setConfirmPasswordError('');
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				{!isTyping && (
					<Image
						source={require('../../assets/logo.png')}
						style={styles.logo}
					/>
				)}
				<InputForm
					label='Email'
					placeholder='Email'
					value={email}
					onChangeText={(t) => handleInputChange('email', t)}
					onFocus={() => setIsTyping(true)}
					onBlur={() => setIsTyping(false)}
					secureTextEntry={false}
					error={emailError}
				/>
				<InputForm
					label='Password'
					placeholder='Password'
					value={password}
					onChangeText={(t) => handleInputChange('password', t)}
					onFocus={() => setIsTyping(true)}
					onBlur={() => setIsTyping(false)}
					secureTextEntry={true}
					error={passwordError}
				/>
				<InputForm
					label='Confirm Password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChangeText={(t) => handleInputChange('confirmPassword', t)}
					onFocus={() => setIsTyping(true)}
					onBlur={() => setIsTyping(false)}
					secureTextEntry={true}
					error={confirmPasswordError}
				/>
				<SubmitButton
					title='Registrarse'
					onPress={onSubmit}
				/>
				<Text style={styles.account}>¿Ya tienes cuenta?</Text>
				<Pressable onPress={() => navigation.navigate('Login')}>
					<Text style={styles.register}>Iniciar Sesión</Text>
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
	logo: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 90,
		marginBottom: 15,
	},
	error: {
		color: colors.error,
		marginBottom: 12,
	},
	account: {
		textAlign: 'center',
		marginTop: 10,
	},
	register: {
		textAlign: 'center',
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default Register;
