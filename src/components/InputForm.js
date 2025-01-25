import { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../globals/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const InputForm = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry,
	error,
	onFocus,
	onBlur,
	autocomplete, // Nueva prop para habilitar autocompletar
	onSelectSuggestion, // Callback al seleccionar una sugerencia
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [suggestions, setSuggestions] = useState([]); // Estado para sugerencias

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const fetchSuggestions = async (text) => {
		// Función para obtener sugerencias de Google Places API
		if (!autocomplete || !text) {
			setSuggestions([]);
			return;
		}
		// Aquí llamamos a la API de Google Places
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=TU_API_KEY&language=es`
			);
			const data = await response.json();
			setSuggestions(data.predictions || []);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={value}
					onChangeText={(text) => {
						onChangeText(text);
						if (autocomplete) fetchSuggestions(text); // Actualiza sugerencias
					}}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry && !isPasswordVisible}
					placeholderTextColor={colors.gray}
					onFocus={onFocus}
					onBlur={() => {
						onBlur?.();
						setSuggestions([]); // Limpia sugerencias al perder el foco
					}}
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
			{/* Renderizar sugerencias */}
			{autocomplete && suggestions.length > 0 && (
				<FlatList
					data={suggestions}
					keyExtractor={(item) => item.place_id}
					renderItem={({ item }) => (
						<TouchableWithoutFeedback
							onPress={() => {
								onSelectSuggestion(item); // Devuelve la sugerencia seleccionada
								setSuggestions([]); // Limpia las sugerencias
							}}
						>
							<View style={styles.suggestionItem}>
								<Text>{item.description}</Text>
							</View>
						</TouchableWithoutFeedback>
					)}
					style={styles.suggestionsList}
				/>
			)}
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
	suggestionsList: {
		marginTop: 5,
		backgroundColor: 'white',
		borderRadius: 5,
		elevation: 2,
	},
	suggestionItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.gray,
	},
});
