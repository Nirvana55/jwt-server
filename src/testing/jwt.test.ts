import { generateJwtToken } from '../utils/jwt';

test('generateJwt', () => {
	const token = generateJwtToken('userId', '2h');

	expect(token).toBeDefined();
	expect(typeof token).toBe('string');
});
