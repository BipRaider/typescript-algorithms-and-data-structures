interface UserReturnRunT {
  name: string;
}

function runTransaction(transaction: { fromTo: [string, string]; to: string }, from: UserReturnRunT) {
  console.log(transaction, from);
}

type GetTransactionArgs<T> = T extends (first: infer First, ...args: any[]) => any ? First : never;

const transaction: GetTransactionArgs<typeof runTransaction> = {
  fromTo: ['first', 'second'],
  to: 'second',
};

type GetTransactionArgs1 = Parameters<typeof runTransaction>;
type GetTransactionArgs2 = Parameters<typeof runTransaction>[0];
type GetTransactionArgs2_1 = Parameters<typeof runTransaction>[1];
type GetTransactionArgs3 = Parameters<typeof runTransaction>[number];

const transaction1: GetTransactionArgs3 = {
  fromTo: ['first', 'second'],
  to: 'second',
};

const transaction1_1: GetTransactionArgs3 = {
  name: 'first',
};

runTransaction(transaction, { name: 'first' });
runTransaction(transaction1, { name: 'first' });
