import { generateToken, verifyToken, returnToken } from '../../utils/jwt';
import { jwtConfig } from '../../configs/jwt';
describe('Test JWT util', () => {
	test('All data true', () => {
		const user = {
			_id: 'this_is_test_id',
			email: 'test@example.com',
		};
		const token = generateToken(user, jwtConfig.ACCESS, jwtConfig.SHORT_TIME);
		expect(token).toBeUndefined();
	});
	test('Missing a value', () => {
		console.log('test');
	});
});
