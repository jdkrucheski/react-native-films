import ImageColors from 'react-native-image-colors';

export const getColors = async (uri: string) => {
  let primary;
  let secundary;
  const colors = await ImageColors.getColors(uri, {});
  switch (colors.platform) {
    case 'android':
      primary = colors.dominant;
      secundary = colors.average;
      break;
    case 'web':
      // web result properties
      primary = colors.dominant;
      secundary = colors.vibrant;
      break;
    case 'ios':
      // iOS result properties
      primary = colors.primary;
      secundary = colors.secondary;
      break;
    default:
      throw new Error('Unexpected platform key');
  }
  return [primary, secundary];
};
