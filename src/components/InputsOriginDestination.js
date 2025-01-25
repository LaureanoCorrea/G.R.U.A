import React from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';

const InputsOriginDestination = ({
	inputValues,
	handleInputChange,
	fetchRoute,
}) => (
	<View style={styles.inputsContainer}>
		<TextInput
			style={styles.input}
			placeholder='Origen'
			value={inputValues.origin}
			onChangeText={(text) => handleInputChange('origin', text)}
		/>
		<TextInput
			style={styles.input}
			placeholder='Destino'
			value={inputValues.destination}
			onChangeText={(text) => handleInputChange('destination', text)}
		/>
		<TouchableOpacity
			style={[styles.button, styles.generateRouteButton]}
			onPress={fetchRoute}
		>
			<Text style={styles.buttonText}>Generar Ruta</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	inputsContainer: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
	},
	input: {
		backgroundColor: '#fff',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
	},
	button: {
		marginTop: 20,
		backgroundColor: '#28a745',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	generateRouteButton: {
		backgroundColor: '#28a745',
	},
});

export default InputsOriginDestination;
