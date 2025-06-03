import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Api from "../ConstAPI";
import type { UserData } from "../interface/interface";

interface IProps {}

const TodosPage = ({}: IProps) => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData: UserData | null = userDataString
    ? JSON.parse(userDataString)
    : null;

  const { isLoading, data } = useQuery({
    queryKey: ["TodosPage"],
    queryFn: async () => {
      const response = await axios.get(`${Api}/todos`, {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`,
        },
      });
      return response.data;
    },
  });

  console.log(data);

  if (isLoading)
    return <div className="text-center text-xl mt-5">جاري التحميل...</div>;

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          كل المهمات
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-gray-700">
            <thead className="bg-emerald-50 border-b">
              <tr>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">
                  #
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">
                  العنوان
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">
                  الوصف
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.data.map((todo: any, index: number) => (
                <tr key={todo.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-right">{index + 1}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    {todo.title}
                  </td>
                  <td className="px-6 py-4 text-right">{todo.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TodosPage;
