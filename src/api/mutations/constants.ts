export const MUTATION_KEYS = {
  UPDATE_TRANSACTIONS: 'updateTransactions',
} as const;

export type MutationKey = keyof typeof MUTATION_KEYS;