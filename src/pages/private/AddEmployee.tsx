import { User } from '../../interfaces/User';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import InputError from '../../components/ui/InputError';
import { useEmployeeForm } from '../../hooks/useEmployeeForm';
import H2 from '../../components/ui/H2';
import H3 from '../../components/ui/H3';

interface FormError {
  message: string;
}

interface AddEmployeeProps {
  user?: User;
}

export const AddEmployee = ({ user }: AddEmployeeProps) => {
  const { register, handleSubmit, handlePhoneKeyDown, errors, isSubmitting, onSubmit } =
    useEmployeeForm(user);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <H2 value="Add Employee" />

      <H3 value="Employee Details" />
      <fieldset className="space-y-1">
        <label className="ml-1 text-sm" htmlFor="name">
          Name
        </label>
        <Input {...register('name')} type="text" placeholder="John Doe" />
        <InputError error={errors.name as FormError} />
      </fieldset>

      <fieldset className="space-y-1">
        <label className="ml-1 text-sm" htmlFor="email">
          Email
        </label>
        <Input {...register('email')} type="email" placeholder="johndoe@upliftcodecamp.com" />
        <InputError error={errors.email as FormError} />
      </fieldset>

      <fieldset className="space-y-1">
        <label className="ml-1 text-sm" htmlFor="role">
          Role
        </label>
        <Input {...register('role')} type="text" placeholder="Student" />
        <InputError error={errors.role as FormError} />
      </fieldset>

      <H3 value="Emergency Contact Details" />
      <fieldset className="space-y-1">
        <label className="ml-1 text-sm" htmlFor="emergencyContactName">
          Name
        </label>
        <Input {...register('emergencyContactName')} type="text" placeholder="Jerry Doe" />
        <InputError error={errors.emergencyContactName as FormError} />
      </fieldset>

      <fieldset className="space-y-1">
        <label className="ml-1 text-sm" htmlFor="emergencyContactNumber">
          Phone
        </label>
        <Input
          onKeyDown={handlePhoneKeyDown}
          {...register('emergencyContactNumber')}
          type="text"
          placeholder="+639123456789"
        />
        <InputError error={errors.emergencyContactNumber as FormError} />
      </fieldset>

      <Button className="w-1/4 min-w-32" type="submit" disabled={isSubmitting}>
        Add Employee
      </Button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};
