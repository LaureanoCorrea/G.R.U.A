import React from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';

const InputsBaseDomain = ({
	inputValues,
	handleInputChange,
	handleBaseAndDomainSet,
}) => (
	<View style={styles.inputsContainer}>
		<TextInput
			style={styles.input}
			placeholder='Base'
			value={inputValues.base}
			onChangeText={(text) => handleInputChange('base', text)}
		/>
		<TextInput
			style={styles.input}
			placeholder='Dominio'
			value={inputValues.domain}
			onChangeText={(text) => handleInputChange('domain', text)}
		/>
		<TouchableOpacity
			style={[styles.button, styles.setBaseDomainButton]}
			onPress={handleBaseAndDomainSet}
		>
			<Text style={styles.buttonText}>Setear Base y Dominio</Text>
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
		backgroundColor: '#ff9800',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	setBaseDomainButton: {
		backgroundColor: '#ff9800',
	},
});

export default InputsBaseDomain;
