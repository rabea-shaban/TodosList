import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
interface IFormData {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    console.log(data);
    // هنا تقدر تبعت البيانات للباك إند أو تعمل لوجيك تسجيل الدخول
    try {
      const { status, data: resData } = await axios.post(
        "http://localhost:1337/api/auth/local",
        data
      );
      console.log(resData);
      if (status === 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          تسجيل الدخول
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">البريد الإلكتروني</label>
          <input
            type="email"
            {...register("identifier", { required: "هذا الحقل مطلوب" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-600">كلمة المرور</label>
          <input
            type="password"
            {...register("password", {
              required: "كلمة المرور مطلوبة",
              minLength: {
                value: 6,
                message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
