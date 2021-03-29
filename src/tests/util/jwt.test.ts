import { generateToken, verifyToken, returnToken } from '../../utils/jwt';
import { jwtConfig } from '../../configs/jwt';
import HttpException from '../../exceptions/http';
import { Token } from '../../interfaces/auth.interface';
describe('Test JWT util', () => {
	describe('Test generate token', () => {
		test('All data true', () => {
			const user = {
				_id: 'this_is_test_id',
				email: 'test@example.com',
			};
			const token = generateToken(user, jwtConfig.ACCESS, jwtConfig.SHORT_TIME);
			expect(token).toBeDefined();
			expect(token).toBeType('string');
		});
	});
	describe('Test verify token', () => {
		let token: string;
		beforeAll(() => {
			const user = {
				_id: 'this_is_test_id',
				email: 'test@example.com',
			};
			token = generateToken(user, jwtConfig.ACCESS, jwtConfig.SHORT_TIME);
		});
		test('Secret key true', () => {
			const result = verifyToken(token, jwtConfig.ACCESS);
			expect(result).toBeType('object');
		});
		test('Secret key false', () => {
			expect(verifyToken(token, jwtConfig.DEVICE)).toThrow(new HttpException(400, 'Test'));
		});
	});
});
