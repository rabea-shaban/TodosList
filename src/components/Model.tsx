import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../ConstAPI";
import type { IformData, IPropsModel } from "../interface/interface";

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

export default function Model({ open, setOpen, refetch }: IPropsModel) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IformData>();

  const onSubmit: SubmitHandler<IformData> = async (data) => {
    try {
      await axios.post(
        `${Api}/todos`,
        {
          data: {
            title: data.title,
            description: data.description,
            user: [userData.user.documentId],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      toast.success("تم اضافة المهمة بنجاح ");
      reset(); // لمسح البيانات بعد الإرسال
      setOpen(false); // إغلاق المودال بعد الإضافة (اختياري)
      refetch();
    } catch (error) {
      toast.error(`${error}`);

      console.log(error);
    }
  };

  const closeModel = () => {
    reset(); // لمسح البيانات بعد الإرسال
    setOpen(false); // إغلاق المودال بعد الإضافة (اختياري)
    refetch();
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10 "
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed  inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="MyStyle fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* عنوان المهمة */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    عنوان المهمة
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "هذا الحقل مطلوب" })}
                    placeholder="أدخل عنوان المهمة"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* وصف المهمة */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    وصف المهمة
                  </label>
                  <textarea
                    {...register("description", { required: "الوصف مطلوب" })}
                    placeholder="أدخل وصفاً موجزاً للمهمة"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm resize-none focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* أزرار التحكم */}
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
                  >
                    اضافة
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
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
