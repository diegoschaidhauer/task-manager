import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken, verifyToken } from '../utils/auth';

describe('Hash Utilities', () => {
  const password = 'password123';

  it('should hash and correctly verify the password', async () => {
    const hashed = await hashPassword(password);
    expect(hashed).toBeDefined();
    expect(await comparePassword(password, hashed)).toBe(true);
    expect(await comparePassword('wrongPassword', hashed)).toBe(false);
  });
});

describe('JWT Utilities', () => {
  const payload = { id: 'user123' };

  it('should generate a valid JWT token', () => {
    const token = generateToken(payload);
    expect(token).toBeDefined();
  });

  it('should verify a valid token', () => {
    const token = generateToken(payload);
    const decoded: any = verifyToken(`Bearer ${token}`);
    expect(decoded).toBeDefined();
    expect(decoded.id).toBe(payload.id);
  });

  it('should return null for invalid token', () => {
    const result = verifyToken('invalid-token');
    expect(result).toBeNull();
  });
});
