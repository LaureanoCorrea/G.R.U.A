import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import SubmitButton from '../components/SubmitButton';

const OrderSelected = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { order } = route.params || {};

	if (!order) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>
					No se encontró la orden seleccionada.
				</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Detalle de la Orden</Text>
			<View style={styles.detail}>
				<Text style={styles.label}>ID de la Orden:</Text>
				<Text style={styles.value}>{order.id}</Text>
			</View>
			<View style={styles.detail}>
				<Text style={styles.label}>Fecha:</Text>
				<Text style={styles.value}>
					{order.createdAt || 'Fecha no disponible'}
				</Text>
			</View>

			<View style={styles.detail}>
				<Text style={styles.label}>Total:</Text>
				<Text style={styles.value}>{`$${order.total || 0}`}</Text>
			</View>
			<Text style={styles.subtitle}>Productos</Text>
			{order.products?.map((product, index) => (
				<View
					key={index}
					style={styles.product}
				>
					<Text style={styles.label}>Producto:</Text>
					<Text style={styles.value}>{product.name}</Text>
					<Text style={styles.label}>Cantidad:</Text>
					<Text style={styles.value}>{product.quantity}</Text>
					<Text style={styles.label}>Precio Unitario:</Text>
					<Text style={styles.value}>{`$${product.price}`}</Text>
				</View>
			)) || (
				<Text style={styles.noProducts}>
					No hay productos asociados a esta orden.
				</Text>
			)}
			<SubmitButton
				title='Volver a Órdenes'
				onPress={() => navigation.goBack()}
			/>
		</ScrollView>
	);
};

export default OrderSelected;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		backgroundColor: '#fff',
		paddingBottom: 100,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
	},
	detail: {
		marginBottom: 12,
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#555',
	},
	value: {
		fontSize: 16,
		color: '#000',
	},
	product: {
		marginBottom: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
	},
	noProducts: {
		fontSize: 16,
		color: '#888',
		fontStyle: 'italic',
	},
	errorText: {
		fontSize: 18,
		color: 'red',
		textAlign: 'center',
	},
});
