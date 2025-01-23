import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';
import { useSelector } from 'react-redux';
import { useDeleteFromCartMutation } from '../services/cart';

const CardForCart = ({ product }) => {
	const { name, price, quantity, images } = product;
	const localId = useSelector((state) => state.user.localId);
	const [triggerDeleteFromCart] = useDeleteFromCartMutation();

	const deleteFromCart = () => {
		triggerDeleteFromCart({ localId, cartId: product.id });
	};

	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={{ uri: images[1] }}
				/>

				<View style={styles.content}>
					<Text style={styles.title}>{name}</Text>
					<View style={styles.containerText}>
						<Text style={styles.text}>Precio: ${price}</Text>
						<Text style={styles.text}>Cantidad: {quantity}</Text>
					</View>
				</View>
				<Pressable onPress={deleteFromCart}>
					<FontAwesome5
						name='trash'
						size={24}
						color={colors.white}
					/>
				</Pressable>
			</View>
		</ErrorBoundary>
	);
};

export default CardForCart;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.secondary,
		padding: 15,
		marginVertical: 8,
		marginHorizontal: 10,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginBottom: 8,
	},
	content: {
		flex: 1,
	},
	title: {
		width: '90%',
		color: colors.darkGray,
		fontSize: 18,
		margin: 10,
		textAlign: 'left',
	},
	containerText: {
		flexDirection: 'row',
		color: colors.darkGray,
		gap: 35,
	},
	text: {
		color: colors.darkGray,
		gap: 10,
		margin: 10,
	},
});
