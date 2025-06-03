import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Model from "../components/Model";
import Api from "../ConstAPI";
import type { ResponseData, Todo, UserData } from "../interface/interface";

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData: UserData | null = userDataString
  ? JSON.parse(userDataString)
  : null;

const HomePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [TodoUpdate, setTodoUpdate] = useState<Todo>({
    id: 0,
    description: "",
    title: "",
  });

  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { isLoading, data, refetch } = useQuery<ResponseData>({
    queryKey: ["todoList"],
    queryFn: async () => {
      const response = await axios.get<ResponseData>(
        `${Api}/users/me?populate=todos`,
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      return response.data;
    },
  });

  const remove = (todo: Todo) => {
    setIsOpenRemove(true);
    setTodoUpdate(todo);
  };

  const OnEdit = (todo: Todo) => {
    setIsOpenEdit(true);
    setTodoUpdate(todo);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${Api}/todos/${TodoUpdate.documentId}`, {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`,
        },
      });
      toast.info(`تم حذف المهمة بنجاح ${TodoUpdate.id}`);
      refetch();
      setIsOpenRemove(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Todo>();

  useEffect(() => {
    if (isOpenEdit && TodoUpdate) {
      reset({
        title: TodoUpdate.title,
        description: TodoUpdate.description,
      });
    }
  }, [isOpenEdit, TodoUpdate, reset]);

  const onSubmitEdit = async (data: Todo) => {
    try {
      await axios.put(
        `${Api}/todos/${TodoUpdate.documentId}`,
        {
          data: {
            title: data.title,
            description: data.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      refetch();
      toast.success("تم التعديل بنجاح ✅");
      setIsOpenEdit(false);
    } catch (error) {
      console.error("فشل التعديل:", error);
      toast.error("فشل التعديل ❌");
    }
  };
  if (isLoading)
    return <div className="text-center text-xl mt-5">جاري التحميل...</div>;

  return (
    <>
      <div className="flex justify-around items-center">
        <button
          className="bg-emerald-600 hover:bg-emerald-400 text-white cursor-pointer p-3 rounded-[6px]"
          onClick={() => setOpen(true)}
        >
          اضافة مهمة جديدة
        </button>
        <h3>عرض كل المهمات</h3>
        <Model open={open} setOpen={setOpen} refetch={refetch} />
      </div>

      <div className="mt-6 px-5">
        <div className="overflow-x-auto rounded-lg ">
          {Array.isArray(data?.todos) && data.todos.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">
              لا توجد مهام حالياً
            </p>
          ) : (
            <table className="md:w-[70%] m-auto table-auto divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    العنوان
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    الوصف
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    الخصائص
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.isArray(data?.todos) &&
                  data.todos.map((todo) => (
                    <tr key={todo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{todo.id}</td>
                      <td className="px-4 py-2 text-sm">{todo.title}</td>
                      <td className="px-4 py-2 text-sm">{todo.description}</td>
                      <td className="px-4 py-2 text-sm flex space-x-2">
                        <TrashIcon
                          onClick={() => remove(todo)}
                          className="cursor-pointer"
                          width={20}
                        />
                        <PencilIcon
                          onClick={() => OnEdit(todo)}
                          className="cursor-pointer"
                          width={20}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* مودال الحذف */}
      <Dialog
        open={isOpenRemove}
        onClose={() => setIsOpenRemove(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl space-y-4">
            <DialogTitle className="text-lg font-semibold text-red-600">
              تأكيد الحذف
            </DialogTitle>
            <Description className="text-sm text-gray-600">
              لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
            </Description>
            <p className="text-sm text-gray-700 leading-relaxed">
              هل أنت متأكد أنك تريد حذف هذا العنصر؟
              <span className="text-red-600 text-2xl font-bold m-1 p-1">
                {TodoUpdate.title}
              </span>
              سيتم إزالة جميع البيانات المرتبطة به نهائيًا من النظام.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpenRemove(false)}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                حذف
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* مودال التعديل */}
      <Dialog
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all">
                <form
                  onSubmit={handleSubmit(onSubmitEdit)}
                  className="p-6 space-y-6"
                >
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
                  <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpenEdit(false)}
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
    </>
  );
};

export default HomePage;
