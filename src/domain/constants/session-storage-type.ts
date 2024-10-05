export const SESSION_STORAGE_TYPES = {
    ChatHistory: 'chat-history-log'
}

export type SessionStorageType = typeof SESSION_STORAGE_TYPES[keyof typeof SESSION_STORAGE_TYPES];
