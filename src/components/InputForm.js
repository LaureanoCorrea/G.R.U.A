import { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../globals/colors';

const InputForm = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry,
	error,
	onFocus,
	onBlur,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry && !isPasswordVisible}
					placeholderTextColor={colors.gray}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				{secureTextEntry && (
					<TouchableOpacity
						style={styles.iconContainer}
						onPress={togglePasswordVisibility}
					>
						<Ionicons
							name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
							size={24}
							color={colors.black}
						/>
					</TouchableOpacity>
				)}
			</View>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

export default InputForm;

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		color: colors.black,
		marginBottom: 5,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.black,
		borderRadius: 5,
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		paddingVertical: 10,
		color: colors.lightGray,
	},
	iconContainer: {
		marginLeft: 10,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},
});
