import apiClient from "./common"; 

// Fetch unassigned messages
export const fetchUnassignedMessages = async () => {
  try {
    const response = await apiClient.get("/messages/unassigned");
    return response?.data?.chats;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch unassigned messages.";
  }
};

// Fetch conversation history
export const fetchConversationHistory = async (id) => {
  try {
    const response = await apiClient.get(`/messages/conversations/${id}`);
    return response?.data?.messages;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch conversation history.";
  }
};

// Send a new message
export const sendMessage = async ({ userId, messageBody }) => {
  try {
    const response = await apiClient.post(`/messages/agent/reply`, {
      user_id: userId,
      message_body: messageBody,
    });
    return response?.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to send the message.";
  }
};
