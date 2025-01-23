import { StyleSheet, FlatList, View, Text } from 'react-native';
import CardCategory from './CardCategory';
import { useGetCategoriesQuery } from '../services/shop';
import ErrorBoundary from '../ErrorBoundary';

const Categories = () => {
	const {
		data: categories,
		isError,
		error,
		isLoading,
	} = useGetCategoriesQuery();

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}
	if (isError || !categories) {
		return (
			<View>
				<Text>Error: {error?.message || 'No categories available'}</Text>
			</View>
		);
	}

	return (
		<ErrorBoundary>
			<FlatList
				data={categories}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <CardCategory item={item} />}
				contentContainerStyle={styles.container}
				ListEmptyComponent={
					<View style={{ padding: 20 }}>
						<Text style={styles.emptyMessage}>
							No hay categorías disponibles.
						</Text>
					</View>
				}
			/>
		</ErrorBoundary>
	);
};

export default Categories;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingBottom: 130,
	},
});
