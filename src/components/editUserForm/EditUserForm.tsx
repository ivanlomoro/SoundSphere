import { useForm, UseFormRegister } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  birthdate: string;
  gender: "Male" | "Female" | "No binary";
  newsletter: boolean;
  data: boolean;
};

export const EditUserForm = () => {
  const { register } = useForm<Inputs>({
    defaultValues: {
      email: "marcoaurelio@gmail.com",
      password: "secretPassword42",
      birthdate: "1991-01-18",
      gender: "Male",
      newsletter: false,
      data: false,
    },
  });

type BasicInputProps = {
  label: string;
  name:keyof Inputs;
  register: UseFormRegister<Inputs>;
  placeholder?: string;
  type: string;
  id: string;
};

  const BasicInput = ({
    label,
    name,
    register,
    placeholder,
    type,
    id,
  }: BasicInputProps) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        {placeholder ? (
          <input
            {...register(name)}
            placeholder={placeholder}
            type={type}
            id={id}
          />
        ) : (
          <input {...register(name)} type={type} id={id} />
        )}
      </div>
    );
  };

  return (
    <form>
      <BasicInput
        label="Email"
        name="email"
        register={register}
        placeholder="Email"
        type="text"
        id="email"
      />
      <BasicInput
        label="Password"
        name="password"
        register={register}
        placeholder="Password"
        type="password"
        id="password"
      />
      <BasicInput
        label="Date of birth"
        name="birthdate"
        register={register}
        placeholder="Birth Date"
        type="date"
        id="birthdate"
      />
      <div>
        <p>Gender</p>
        <div>
          <label htmlFor="male">Male</label>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            value="Male"
            id="male"
          />
        </div>
        <div>
          <label htmlFor="female">Female</label>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            value="Female"
            id="female"
          />
        </div>
        <div>
          <label htmlFor="noBinary">No binary</label>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            value="No binary"
            id="noBinary"
          />
        </div>
      </div>
      <div>
        <p>Privacy Policy</p>
        <p>
          In the privacy policy you will find more information about how we
          collect, use, share and project your personal data.
        </p>
        <div>
          <label htmlFor="accept">I want to receive news and offers</label>
          <input
            {...register("newsletter")}
            type="checkbox"
            name="newsletter"
            id="accept"
          />
        </div>
        <div>
          <label htmlFor="data">
            Share my registration data with content providers
          </label>
          <input {...register("data")} type="checkbox" name="data" id="data" />
        </div>
      </div>
    </form>
  );
};
