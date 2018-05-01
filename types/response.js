export default `
  type AddResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type Response {
    ok: Boolean!
    errors: [Error!]
  }
`;
