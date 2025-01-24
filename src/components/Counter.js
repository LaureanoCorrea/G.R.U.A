import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import colors from '../globals/colors';

const Counter = ({ quantity, increment, decrement }) => {
	return (
		<View style={styles.container}>
			<Pressable
				style={styles.button}
				onPress={decrement}
			>
				<Text style={styles.textButton}>-</Text>
			</Pressable>
			<Text style={styles.text}>{quantity}</Text>
			<Pressable
				style={styles.button}
				onPress={increment}
			>
				<Text style={styles.textButton}>+</Text>
			</Pressable>
		</View>
	);
};

export default Counter;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 5,
		alignItems: 'center',
		gap: 20,
	},
	button: {
		backgroundColor: colors.secondary,
		width: 50,
		padding: 7,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textButton: {
		color: colors.lightGray,
		fontSize: 20,
	},
});
