import { StyleSheet, Text, Pressable } from 'react-native';
import colors from '../globals/colors';

const SubmitButton = ({ title, onPress }) => {
	return (
		<Pressable
			style={styles.button}
			onPress={onPress}
		>
			<Text style={styles.title}>{title}</Text>
		</Pressable>
	);
};

export default SubmitButton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
		marginVertical: 10,
	},
	title: {
		color: colors.white,
		fontSize: 16,
	},
});
