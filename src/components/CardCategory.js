import { Pressable, StyleSheet, Text } from 'react-native';
import ShadowCard from './wrappers/ShadowCard';
import { useNavigation } from '@react-navigation/native';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';

const CardCategory = ({ item: category }) => {
	const navigation = useNavigation();

	const categoryName = category.name || category;

	return (
		<ErrorBoundary>
			<Pressable
				style={styles.container}
				onPress={() => {
					navigation.navigate('Products', { category });
				}}
			>
				<ShadowCard style={styles.cardContainer}>
					<Text style={styles.text}>{categoryName}</Text>
				</ShadowCard>
			</Pressable>
		</ErrorBoundary>
	);
};

export default CardCategory;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	cardContainer: {
		width: '95%',
		backgroundColor: colors.secondary,
		borderRadius: 10,
		paddingHorizontal: 90,
		paddingVertical: 15,
		marginVertical: 8,
		marginHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 15,
		color: colors.darkGray,
	},
});
