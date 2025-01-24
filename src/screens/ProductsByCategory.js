import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import colors from '../globals/colors';
import ShadowCard from '../components/wrappers/ShadowCard';
import Search from '../components/Search';
import CardProducts from '../components/CardProducts';
import { useGetProductsQuery } from '../services/shop';
import ErrorBoundary from '../ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyListComponent from '../components/EmptyListComponent';

const ProductsByCategory = ({ route }) => {
	const { category } = route.params;

	const { data, isSuccess, isLoading } = useGetProductsQuery(category);

	const [keyword, setKeyword] = useState('');
	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (isSuccess) {
			const filteredProducts = Object.values(data).filter((product) =>
				product.name?.toLowerCase().includes(keyword.toLowerCase())
			);
			setProducts(filteredProducts);
		}
	}, [keyword, isSuccess, data]);

	const handleKeywordChange = useCallback((text) => setKeyword(text), []);

	if (isLoading) return <LoadingSpinner />;
	if (products.length === 0)
		return <EmptyListComponent message='No hay productos en esta categoría.' />;

	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<Search onChangeKeyword={handleKeywordChange} />
				<ShadowCard>
					<FlatList
						data={products}
						keyExtractor={(item) => item.id?.toString()}
						renderItem={({ item }) => (
							<CardProducts
								product={item}
								selectedCategory={category}
							/>
						)}
						contentContainerStyle={styles.containerList}
						ListEmptyComponent={
							<Text style={styles.noProducts}>
								No se encontraron productos en esta categoría.
							</Text>
						}
						initialNumToRender={10}
						maxToRenderPerBatch={10}
						windowSize={5}
					/>
				</ShadowCard>
			</View>
		</ErrorBoundary>
	);
};

export default ProductsByCategory;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: colors.lightGray,
	},
	containerList: {
		paddingBottom: 220,
	},
	noProducts: {
		fontSize: 16,
		color: colors.sorry,
		textAlign: 'center',
		marginTop: 20,
	},
});
