export type ErrorMessage = {
  errorStatus: string;
  errorStatusText: string;
  errorData: {
    detail: string | Array<UnprocessableEntityError>;
  };
};

export interface UnprocessableEntityError {
  type: string;
  loc: [object];
  msg: string;
  input: string;
  ctx: [object];
}
