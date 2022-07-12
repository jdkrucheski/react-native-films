import React, {createContext, useState} from 'react';
import {StatusBar} from 'react-native';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setMainColors: (colors: ImageColors) => void;
  setPrevMainColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });
  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });
  const setMainColors = (c: ImageColors) => {
    setColors(c);
  };
  const setPrevMainColors = (c: ImageColors) => {
    setPrevColors(c);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
      }}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {children}
    </GradientContext.Provider>
  );
};
