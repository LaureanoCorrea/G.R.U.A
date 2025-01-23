import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';
import { useAddToCartMutation } from '../services/cart';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Details = ({ route }) => {
	const navigation = useNavigation();
	const { product, selectedCategory } = route.params;
	const localId = useSelector((state) => state.user.localId);
	const [triggerAddProduct] = useAddToCartMutation();

	const handleAddToCart = () => {
		const cartProduct = {
			...product,
			quantity: 1,
		};
		triggerAddProduct({ localId, cartProduct });
		navigation.navigate('Cart');
	};

	return (
		<>
			<ErrorBoundary>
				<Text style={styles.category}>Categoría: {selectedCategory}</Text>

				<Image
					source={{ uri: product.thumbnail }}
					style={styles.image}
					resizeMode='cover'
				/>
				<Text style={styles.category}>
					Cantidad Disponible: {product.stock}
				</Text>
				<View style={styles.container}>
					<Text style={styles.text}>{product.name}</Text>
					<Text style={styles.price}>${product.price}</Text>
					<Text>{product.description}</Text>
				</View>
				<Pressable
					style={styles.boton}
					onPress={handleAddToCart}
				>
					<Text>Agregar al Carrito</Text>
				</Pressable>
			</ErrorBoundary>
		</>
	);
};

export default Details;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.secondary,
		borderRadius: 10,
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	category: {
		flexDirection: 'row',
		fontWeight: 'bold',
		fontSize: 11,
		color: colors.darkGray,
		marginVertical: 6,
		marginRight: 10,
		textAlign: 'right',
	},
	text: {
		fontSize: 17,
		color: colors.darkGray,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 40,
		color: colors.lightGray,
		margin: 10,
		fontFamily: 'Jura',
	},
	image: {
		width: '100%',
		height: 360,
		borderRadius: 10,
	},
	boton: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 10,
		margin: 10,
		alignItems: 'center',
	},
});
