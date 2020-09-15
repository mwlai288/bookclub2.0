const initialState = {
  allBooks: null,
  singleBook: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SEARCH_BOOKS":
      return {
        ...state,
        allBooks: payload,
        loading: false,
      };

    case "GET_BOOK":
      return {
        ...state,
        singleBook: payload,
        loading: false,
      };

    case "CLEAR_BOOKS":
      return {
        ...state,
        allBooks: null,
        singleBook: null,
        error: payload,
      };
    default:
      return state;
  }
}
