import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../ConstAPI";
import type { IChangePaswoord, UserData } from "../interface/interface";

interface IProps {}

const Profile_Page = ({}: IProps) => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData: UserData | null = userDataString
    ? JSON.parse(userDataString)
    : null;

  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChangePaswoord>();

  const opneModel = () => {
    setIsOpen(true);
  };
  const closeModel = () => {
    reset();
    setIsOpen(false);
  };

  const onChangePassword = async (data: IChangePaswoord) => {
    try {
      await axios.post(
        `${Api}/auth/change-password`,
        {
          currentPassword: data.currentPassword,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      toast.success("تم تغيير كلمة المرور بنجاح");
      reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || "حدث خطأ ما");
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          ملف المستخدم
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">اسم المستخدم:</span>
            <span>{userData?.user.username || "غير متوفر"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">البريد الإلكتروني:</span>
            <span>{userData?.user.email || "غير متوفر"}</span>
          </div>
        </div>
        <div className=" w-fit m-auto">
          <button
            onClick={opneModel}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            تغير كلمة السر
          </button>
        </div>
      </div>

      {/* Edite Model */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)} // أو onCloseEdit لو حابب
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form
                onSubmit={handleSubmit(onChangePassword)}
                className="p-6 space-y-6"
              >
                <div>
                  <input
                    type="text"
                    {...register("currentPassword", {
                      required: "هذا الحقل مطلوب",
                    })}
                    placeholder="كلمة السر الحالية"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("password", {
                      required: "هذا الحقل مطلوب",
                    })}
                    placeholder="كلمة السر الجديدة"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("passwordConfirmation", {
                      required: "هذا الحقل مطلوب",
                    })}
                    placeholder=" تاكيد كلمة السر الجديدة "
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.passwordConfirmation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.passwordConfirmation.message}
                    </p>
                  )}
                </div>

                {/* أزرار التحكم */}
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
                  >
                    تعديل
                  </button>
                  <button
                    type="button"
                    onClick={closeModel}
                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Profile_Page;
