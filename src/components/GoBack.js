import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import colors from '../globals/colors';

const GoBack = () => {
	const navigation = useNavigation();
	return (
		<Pressable
			style={styles.icon}
			onPress={() => navigation.goBack()}
		>
			<Ionicons
				name='return-up-back-outline'
				size={24}
				color={colors.darkGray}
			/>
		</Pressable>
	);
};

export default GoBack;

const styles = StyleSheet.create({
	icon: {
		width: 40,
		position: 'absolute',
		left: 15,
	},
});
