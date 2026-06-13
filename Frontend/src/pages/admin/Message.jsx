import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllMessages = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/message/getAllMessages",
        {
          method: "GET",
        },
      );
      const data = await res.json();

      if (data.status === "success" && data.data) {
        setMessages(data.data);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Error fetching messages in frontend:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this support message?",
      )
    ) {
      return;
    }

    try {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId),
      );

      const res = await fetch(
        `http://localhost:5000/api/message/deleteMessage/${messageId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data.status !== "success") {
        alert("Failed to delete message from the server.");
        getAllMessages();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      getAllMessages();
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading inbox...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Customer Support Inbox
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            No support messages found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50/70">
                <tr>
                  <th
                    scope="col"
                    className="w-12 px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                  >
                    Sender Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                  >
                    Message Content
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                  >
                    Received At
                  </th>
                  <th
                    scope="col"
                    className="w-20 px-6 py-4 text-xs font-semibold uppercase text-gray-500 text-center"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {messages.map((msg, index) => (
                  <tr
                    key={msg._id}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-400 align-top">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {msg.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {msg.email}
                      </div>
                      <div className="text-xs font-mono text-indigo-600 mt-1.5 bg-indigo-50 px-2 py-0.5 rounded w-max">
                        {msg.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top max-w-md">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        "{msg.message}"
                      </p>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-400 align-top whitespace-nowrap">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </td>
                    {/* Delete  Button  */}
                    <td className="px-6 py-4 text-center align-top">
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                      >
                        <MdDeleteForever size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
