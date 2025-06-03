import axios from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Api from "../../ConstAPI";
import type { IRegister } from "../../interface/interface";


const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const [serverError, setServerError] = useState("");

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      setServerError("");
      const { status, data: resData } = await axios.post(
        `${Api}/auth/local/register`,
        data
      );
      if (status === 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        location.replace("/");
      }
    } catch (error: any) {
      console.log(error);
      setServerError(
        "حدث خطأ أثناء التسجيل، تأكد من صحة البيانات أو أن البريد الإلكتروني غير مستخدم مسبقًا."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          تسجيل حساب جديد
        </h2>

        {serverError && (
          <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">اسم المستخدم</label>
          <input
            type="text"
            {...register("username", { required: "هذا الحقل مطلوب" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اسم المستخدم"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">البريد الإلكتروني</label>
          <input
            type="email"
            {...register("email", { required: "هذا الحقل مطلوب" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
          تسجيل حساب
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
