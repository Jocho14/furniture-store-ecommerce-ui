import { PAYMENT_SERVER_URL } from "@/config/config";
import axios from "axios";

export const fetchSessionStatus = async (sessionId: string | null) => {
  if (!sessionId) throw new Error("Session ID is required");

  const { data } = await axios.get(
    `${PAYMENT_SERVER_URL}/checkout/session-status`,
    {
      params: { session_id: sessionId },
    }
  );

  return data;
};
