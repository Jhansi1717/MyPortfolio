export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  error?: boolean;
}

export interface CopilotStatus {
  status: 'ready' | 'key_missing' | 'error';
  configured: boolean;
  model: string;
}
