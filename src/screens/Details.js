import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';
import { useAddToCartMutation, useGetProductQuery } from '../services/cart';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Counter from '../components/Counter';

const Details = ({ route }) => {
	const [quantity, setQuantity] = useState(1);
	const navigation = useNavigation();
	const { product, selectedCategory } = route.params;
	const localId = useSelector((state) => state.user.localId);
	const [triggerAddProduct] = useAddToCartMutation();
	const { data: productCart } = useGetProductQuery({
		localId,
		productId: product.id,
	});

	const cartQuantity = productCart ? productCart.quantity : 0;
	const availableStock = product.stock - cartQuantity;
	const isOutOfStock = availableStock <= 0;

	const increment = () => {
		if (quantity < availableStock) {
			setQuantity(quantity + 1);
		}
	};

	const decrement = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = () => {
		if (isOutOfStock) return;

		const newQuantity = quantity + cartQuantity;
		const cartProduct = {
			...product,
			quantity: newQuantity,
		};
		triggerAddProduct({ localId, cartProduct });
		setQuantity(1);
		navigation.navigate('Cart');
	};

	return (
		<>
			<ErrorBoundary>
				<View style={styles.mainContainer}>
					<Text style={styles.category}>Categoría: {selectedCategory}</Text>
					<Image
						source={{ uri: product.thumbnail }}
						style={styles.image}
						resizeMode='cover'
					/>
					<Text style={styles.category}>
						Cantidad Disponible: {availableStock}
					</Text>
					<View style={styles.subContainer}>
						<Text style={styles.text}>{product.name}</Text>
						<Text style={styles.price}>${product.price}</Text>
						<Text>{product.description}</Text>
					</View>

					{isOutOfStock ? (
						<View style={styles.outOfStockContainer}>
							<Image
								source={require('../../assets/out-of-stock.png')}
								style={styles.outOfStockImage}
							/>
						</View>
					) : (
						<Counter
							quantity={quantity}
							increment={increment}
							decrement={decrement}
						/>
					)}

					<Pressable
						style={[styles.boton, isOutOfStock && styles.botonDisabled]}
						onPress={handleAddToCart}
						disabled={isOutOfStock}
					>
						<Text style={styles.botonText}>
							{isOutOfStock ? 'Sin Stock' : 'Agregar al Carrito'}
						</Text>
					</Pressable>
				</View>
			</ErrorBoundary>
		</>
	);
};

export default Details;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.red,
		marginBottom: 570,
	},
	subContainer: {
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
		fontSize: 25,
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
	botonDisabled: {
		backgroundColor: colors.gray,
	},
	botonText: {
		color: colors.white,
		fontWeight: 'bold',
	},
	outOfStockContainer: {
		alignItems: 'center',
		marginVertical: 10,
	},
	outOfStockImage: {
		width: 250,
		height: 50,
	},
});
