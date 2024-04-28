import { employees } from './employees';

describe('employees', () => {
  it('should contain an array of employees', () => {
    expect(Array.isArray(employees)).toBe(true);
  });

  it('should have at least one employee', () => {
    expect(employees.length).toBeGreaterThan(0);
  });

  it('should have employees with valid properties', () => {
    employees.forEach(employee => {
      expect(employee).toHaveProperty('email');
      expect(employee).toHaveProperty('emergencyContactName');
      expect(employee).toHaveProperty('emergencyContactNumber');
      expect(employee).toHaveProperty('id');
      expect(employee).toHaveProperty('name');
      expect(employee).toHaveProperty('role');
    });
  });
});
