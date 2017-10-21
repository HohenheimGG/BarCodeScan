/**
 * @providesModule BCSConstant
 */

module.exports = {
	/**
   * 数据库名称
   */
  PRODUCT_INFO_DB: 'product_info',

	/**
   * 数据库是否初始化
   */
  IS_INIT: 'is_init_db',
  HAS_INIT: '1',
	/**
   * 数据库插入数据返回码
   */
  INSERT_SUCCESS: '0',//成功
  INSERT_REPEAT: '1', //数据已在数据库
  INSERT_DATA_ERROR: '2', //插入数据格式有误
  INSERT_UNKNOWN: '3'//未知错误
};
