import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';

const Search = ({ onChangeKeyword }) => {
	const [textInput, setTextInput] = useState('');
	const [error, setError] = useState('');

	const search = () => {
		const regex = /^[+=\%*@&$   ]/;
		if (regex.test(textInput)) {
			return setError('Caracteres no permitidos');
		}
		setError('');
		onChangeKeyword(textInput);
	};

	const removeSearch = () => {
		setTextInput('');
		onChangeKeyword('');
		setError('');
	};

	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<View style={styles.containerInput}>
					<TextInput
						style={styles.input}
						value={textInput}
						onChangeText={(text) => setTextInput(text)}
						placeholder='Buscar productos...'
					/>
					<Pressable
						style={styles.buton}
						onPress={search}
					>
						<Ionicons
							name='search-circle-outline'
							size={24}
							color='black'
						/>
					</Pressable>
					<Pressable
						style={styles.buton}
						onPress={removeSearch}
					>
						<MaterialCommunityIcons
							name='cancel'
							size={22}
							color='black'
						/>
					</Pressable>
				</View>
				<View>
					<Text style={styles.error}>{error ? error : ''}</Text>
				</View>
			</View>
		</ErrorBoundary>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		marginVertical: 5,
	},
	containerInput: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		color: colors.darkGray,
		borderWidth: 1,
		borderColor: colors.sorry,
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	buton: {
		marginLeft: 10,
	},
	error: {
		color: colors.error,
		textAlign: 'center',
		marginTop: 4,
		fontWeight: 'bold',
	},
});
