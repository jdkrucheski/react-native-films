import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {CastItem} from '../components/CastItem';
import {MovieDetails} from '../components/MovieDetails';
import {useMovieDetails} from '../hooks/useMoviesDetails';
import {RootStackParams} from '../navigation/MyStack';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const screenHeight = Dimensions.get('screen').height;

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.image} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{movie.original_title}</Text>

        <Text style={styles.subTitle} numberOfLines={2} adjustsFontSizeToFit>
          {movie.title}
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={30} color="grey" style={{marginTop: 10}} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}
      {/* Casting */}
      <View style={{marginTop: 10, marginBottom: 10}}>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={({item}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          style={{marginTop: 10, height: 70}}
        />
      </View>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color="white" name="arrow-back-outline" size={60} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  image: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    color: 'gray',

    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'gray',
    fontSize: 16,
    opacity: 0.8,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
});
