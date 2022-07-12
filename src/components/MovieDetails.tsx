import React from 'react';
import {Text, View} from 'react-native';
import {Cast} from '../interfaces/creditsInterface';
import {MovieFull} from '../interfaces/movieInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="star" color="gold" size={20} />
          <Text style={{color: 'gray', marginHorizontal: 5}}>
            {movieFull.vote_average}
          </Text>
          <Text style={{color: 'gray'}}>
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>
        <Text
          style={{
            color: 'gray',
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Resumen
        </Text>
        <Text style={{color: 'gray', fontSize: 16}}>{movieFull.overview}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>
            Presupuesto:{' '}
          </Text>
          <Text style={{color: 'gray', fontSize: 16}}>
            {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
          </Text>
        </View>
      </View>
    </>
  );
};
