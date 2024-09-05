import { HttpError } from 'core/http/http-error.model';
import { Chat, ChatHistoryItem, ChatMessage } from 'core/models/chat-history-item';
import { instance as http } from 'core/http/http.service';
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

export async function getMessages(userId: string, chatId: string, take: number): Promise<{ items: ChatMessage[]; isSuccessful: true } | HttpError> {
  try {
    const { data } = await http.get<ChatMessage[], AxiosResponse<ChatMessage[], unknown>, unknown>(`messages/?chatId=${chatId}&take=${take}&skip=0`);
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

export async function getPreviousMessages(chatId: string, messageId: string, take: number): Promise<{ items: ChatMessage[]; isSuccessful: true } | HttpError> {
  try {
    const { data } = await http.get<ChatMessage[], AxiosResponse<ChatMessage[], unknown>, unknown>(`messages/incremental?chatId=${chatId}&messageId=${messageId}&take=${take}`);
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

export async function getChat(chatId: string): Promise<{ chat: Chat; isSuccessful: true } | HttpError> {
  try {
    const { data } = await http.get<Chat, AxiosResponse<Chat, unknown>, unknown>(`chats/${chatId}`);
    return { chat: data, isSuccessful: true };
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

export async function sendMessage(request: SendMessageRequest): Promise<{ isSuccessful: true } | HttpError> {
  try {
    await http.post<unknown, AxiosResponse<unknown, unknown>, unknown>(`messages`, request);
    return { isSuccessful: true };
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

export type SendMessageRequest = {
  chatId: string;
  senderId: string;
  text: string;
};

export async function updateChatName(chatId: string, request: UpdateChatNameRequest): Promise<{ isSuccessful: true } | HttpError> {
  try {
    await http.put<unknown, AxiosResponse<unknown, unknown>, unknown>(`chats/${chatId}/name`, request);
    return { isSuccessful: true };
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

export type UpdateChatNameRequest = {
  name: string;
};

export async function addToFavorite(chatId: string, userId: string): Promise<{ isSuccessful: true } | HttpError> {
  try {
    await http.put<unknown, AxiosResponse<unknown, unknown>, unknown>(`chats/${chatId}/addToFavorite/${userId}`);
    return { isSuccessful: true };
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
