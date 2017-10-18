/**
 * @providesModule Theme
 */
import Dimensions from 'Dimensions';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let Grid = {
  A: SCREEN_WIDTH/12,
  a: SCREEN_WIDTH/60
};

module.exports = {
  Grid,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
};