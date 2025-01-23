import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import colors from '../globals/colors';
import { useNavigation } from '@react-navigation/native';
import ErrorBoundary from '../ErrorBoundary';

const CardProducts = ({ product, selectedCategory }) => {
	const { name, price, stock, thumbnail } = product;
	const navigation = useNavigation();
	return (
		<ErrorBoundary>
			<Pressable
				style={styles.container}
				onPress={() =>
					navigation.navigate('Details', { product, selectedCategory })
				}
			>
				<Text style={styles.name}>{name}</Text>
				<Image
					style={styles.image}
					source={{ uri: thumbnail }}
					resizeMode='stretch'
				/>
				<View style={styles.info}>
					<Text style={styles.price}>${price.toLocaleString()}</Text>
					<Text style={styles.categories}>Stock: {stock}</Text>
					<Text style={styles.categories}>
						Categoría:
						{selectedCategory}
					</Text>
				</View>
			</Pressable>
		</ErrorBoundary>
	);
};

export default CardProducts;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 7,
		padding: 16,
		margin: 12,
		backgroundColor: colors.secondary,
		borderRadius: 8,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	info: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	name: {
		width: '100%',
		fontSize: 16,
		fontFamily: 'Jura',
		marginBottom: 4,
		textAlign: 'center',
	},
	price: {
		fontSize: 28,
		color: colors.white,
		marginBottom: 4,
		textAlign: 'right',
		fontFamily: 'Jura',
	},
	categories: {
		fontWeight: 'bold',
		fontSize: 11,
		color: colors.darkGray,
		marginBottom: 4,
		textAlign: 'right',
	},
	image: {
		minWidth: 120,
		minHeight: 120,
		width: '30vw',
		height: '30vw',
		borderRadius: 8,
		marginBottom: 8,
	},
});
