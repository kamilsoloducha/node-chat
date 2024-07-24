import { HttpError } from 'core/http/http-error.model';
import { ChatHistoryItem } from 'core/models/chat-history-item';
import http from 'core/http/http.service';
import { AxiosError, AxiosResponse } from 'axios';

const CHATS_PATH = '/chats';

export async function getUsersChat(userId: number): Promise<{ items: ChatHistoryItem[]; isSuccessful: true } | HttpError> {
  try {
    const { data } = await http.get<ChatHistoryItem[], AxiosResponse<ChatHistoryItem[], unknown>, unknown>(`${CHATS_PATH}/user/${userId}`);
    return { items: data, isSuccessful: true };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const httpError: HttpError = {
        isSuccessful: false,
        statusCode: error.response?.status,
        friendlyErrorMessage: undefined,
        errorMessage: error.message,
        errorCode: error.response?.data.errorCode,
      };

      return httpError as any;
    }
    return { errorMessage: 'Internal server error. Please try again later.', isSuccessful: false };
  }
}
