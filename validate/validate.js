import * as Rules from './rules';
/**
 * [description]
 * @param  {[type]}   value  输入值
 * @param  {[type]}   rule   校验规则
 * @param  {[type]}   errors 错误提示
 * @param  {Function} cb     回调
 * @return {[type]}          [description]
 */

export const phoneValidate = (value) => {
	if(Rules.phoneNumber.test(value)){
		return true;
	}
	return false;
}
export const required = (value) => {
	if(value == ''||Rules.required.test(value)){
		return false;
	}
	return true;
}
export const length8 = (value) => {
	if(value==''||Rules.length8.test(value)){
		return true;
	}
	return false;
}