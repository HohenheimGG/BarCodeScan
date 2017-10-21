/**
 * @providesModule ArrayUtils
 */

function removeIndex(list: Array, index: number) {
	[].splice.apply(list, [index, 1]);
	return list;
}

module.exports = {
	removeIndex
};