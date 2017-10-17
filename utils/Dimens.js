/**
 * @providesModule Theme
 */
import Dimensions from 'Dimensions';
const SCREEN_WIDTH = Dimensions.get('window').width;

let Grid = {
  A: SCREEN_WIDTH/12,
  a: SCREEN_WIDTH/60
};

module.exports = {
  Grid,
  SCREEN_WIDTH
};