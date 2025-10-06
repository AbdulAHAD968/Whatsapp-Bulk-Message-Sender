export interface MessageData {
  message: string;
  numbers: string[];
}

export interface UploadResponse {
  success: boolean;
  numbers: string[];
  total: number;
  error?: string;
}

export interface SendMessageResponse {
  success: boolean;
  message?: string;
  error?: string;
  sentCount?: number;
  failedCount?: number;
}