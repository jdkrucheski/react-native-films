import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Movie} from '../interfaces/movieInterface';
import {MovieCard} from './MovieCard';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlide = ({title, movies}: Props) => {
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && <Text style={{fontSize: 30, fontWeight: 'bold'}}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={(item: {item: Movie}) => (
          <MovieCard movie={item.item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
