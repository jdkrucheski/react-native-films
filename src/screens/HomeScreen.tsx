import React, {useContext, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {useMovies} from '../hooks/useMovies';
import {HorizontalSlide} from '../components/HorizontalSlide';
import {getColors} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');
const imageW = width * 0.7;
const imageH = imageW * 1.54;

export const HomeScreen = () => {
  const {nowPlaying, popular, topRate, upcoming, isLoading} = useMovies();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getCardColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const [primary = '#FFC069', secondary = '#EFEFEF'] = await getColors(uri);
    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getCardColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  const renderItem = (item: string) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    );
  };
  return (
    <View style={styles.containner}>
      <StatusBar hidden />
      <ScrollView>
        <View
          style={{
            paddingTop: top + 20,
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={StyleSheet.absoluteFillObject}>
            {nowPlaying.map(({id, poster_path}, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              return (
                <Animated.Image
                  key={`${id}-${index}`}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
                  }}
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      opacity,
                    },
                  ]}
                  blurRadius={20}
                />
              );
            })}
          </View>
          <View style={{height: 440}}>
            <Animated.FlatList
              data={nowPlaying}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              horizontal
              pagingEnabled
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) =>
                renderItem(
                  `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                )
              }
            />
          </View>
          <HorizontalSlide title="Popular" movies={popular} />
          <HorizontalSlide title="Top Rated" movies={topRate} />
          <HorizontalSlide title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: 'black',
  },
  item: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  image: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
});
