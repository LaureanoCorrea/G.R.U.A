import React from 'react';
import {
	View,
	FlatList,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';

const SuggestionsList = ({ suggestions, focusedField, selectSuggestion }) => (
	<FlatList
		data={suggestions}
		keyExtractor={(item) => item.place_id}
		renderItem={({ item }) => (
			<TouchableOpacity
				style={styles.suggestionItem}
				onPress={() => selectSuggestion(item.description)}
			>
				<Text>{item.description}</Text>
			</TouchableOpacity>
		)}
		style={styles.suggestionsList}
	/>
);

const styles = StyleSheet.create({
	suggestionItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#ccc',
	},
	suggestionsList: {
		position: 'absolute',
		top: 60, // Ajustar para que aparezcan debajo del input
		left: 20,
		right: 20,
		zIndex: 999,
	},
});

export default SuggestionsList;
