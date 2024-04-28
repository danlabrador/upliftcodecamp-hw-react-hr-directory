import { KeyboardEvent, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '../interfaces/User';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { employees, getLastId } from '../services/api/employees';

// Set up a schema and type for the form fields
const schema = z.object({
  name: z.string().refine(value => value.trim().split(/\s+/).length >= 2, {
    message: 'Please enter your full name.',
  }),
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(3, {
    message: 'Role must be at least 3 characters long.',
  }),
  emergencyContactName: z.string().refine(value => value.trim().split(/\s+/).length >= 2, {
    message: 'Please enter their full name.',
  }),
  emergencyContactNumber: z.string().refine(value => /^(\+)?[0-9]{7,}$/.test(value), {
    message: 'Contact number must contain at least 7 numbers and may include a plus symbol',
  }),
});

type FormFields = z.infer<typeof schema>;

export function useEmployeeForm(user: User | undefined) {
  // MARK: Form
  // Set up local storage for form values
  const {
    setItem: setLSName,
    getItem: getLSName,
    removeItem: removeLSName,
  } = useLocalStorage('name');

  const {
    setItem: setLSEmail,
    getItem: getLSEmail,
    removeItem: removeLSEmail,
  } = useLocalStorage('email');

  const {
    setItem: setLSRole,
    getItem: getLSRole,
    removeItem: removeLSRole,
  } = useLocalStorage('role');

  const {
    setItem: setLSEmergencyContactName,
    getItem: getLSEmergencyContactName,
    removeItem: removeLSEmergencyContactName,
  } = useLocalStorage('emergencyContactName');

  const {
    setItem: setLSEmergencyContactNumber,
    getItem: getLSEmergencyContactNumber,
    removeItem: removeLSEmergencyContactNumber,
  } = useLocalStorage('emergencyContactNumber');

  // Set up the form
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: user
      ? {
          name: getLSName() || user.name || '',
          email: getLSEmail() || user.email || '',
          role: getLSRole() || user.role || '',
          emergencyContactName: getLSEmergencyContactName() || user.emergencyContactName || '',
          emergencyContactNumber:
            getLSEmergencyContactNumber() || user.emergencyContactNumber || '',
        }
      : {
          name: getLSName() || '',
          email: getLSEmail() || '',
          role: getLSRole() || '',
          emergencyContactName: getLSEmergencyContactName() || '',
          emergencyContactNumber: getLSEmergencyContactNumber() || '',
        },
    resolver: zodResolver(schema),
  });

  // Update local storage when form values change
  const formValues = watch();
  useEffect(() => {
    if (formValues.name) setLSName(formValues.name);
    if (formValues.email) setLSEmail(formValues.email);
    if (formValues.role) setLSRole(formValues.role);
    if (formValues.emergencyContactName) setLSEmergencyContactName(formValues.emergencyContactName);
    if (formValues.emergencyContactNumber)
      setLSEmergencyContactNumber(formValues.emergencyContactNumber);
  }, [
    formValues.name,
    formValues.email,
    formValues.role,
    formValues.emergencyContactName,
    formValues.emergencyContactNumber,
    setLSName,
    setLSEmail,
    setLSRole,
    setLSEmergencyContactName,
    setLSEmergencyContactNumber,
  ]);

  // MARK: Phone Key Down
  const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' ||
      (event.key !== 'Backspace' &&
        !(event.key === 'a' && (event.ctrlKey || event.metaKey)) &&
        !/^(\+)?[0-9]*$/.test(event.currentTarget.value + event.key))
    ) {
      event.preventDefault();
    }
  };

  // MARK: Submit
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormFields> = async (data: User) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Remove local storage values
      removeLSName();
      removeLSEmail();
      removeLSRole();
      removeLSEmergencyContactName();
      removeLSEmergencyContactNumber();
      reset();

      // Add the new employee to the list
      data.id = getLastId() + 1;
      employees.push(data);
      console.log(employees);
      navigate('/employees');
    } catch (error) {
      setError('root', {
        message: 'This email is already taken',
      });
    }
  };

  return {
    errors,
    handlePhoneKeyDown,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
  };
}
