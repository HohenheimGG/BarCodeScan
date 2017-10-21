/**
 * @providesModule ArrayUtils
 */

function remove(list: Array, index: number) {
	list.splice(index, index - 1);
}

module.exports = {
	remove
};