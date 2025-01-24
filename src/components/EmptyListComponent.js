import { View, Text, StyleSheet, Image } from 'react-native';

const EmptyListComponent = ({ message }) => {
	return (
		<View style={styles.container}>
			<View>
				<Image
					source={require('../../assets/nothing.png')}
					style={{ width: 390, height: 250 }}
				/>
			</View>
			<Text style={styles.errorMessage}>{message}</Text>
		</View>
	);
};
export default EmptyListComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorMessage: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: 'center',
	},
});
