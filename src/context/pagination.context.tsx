import { NextRouter, withRouter } from "next/router";
import { createContext, useContext, Component, ReactNode } from "react";
import { ErrorContext, useErrorContext } from "./error.context";

const PaginationContext = createContext({
  page: 1,
  rows: 10,
});

type PaginationComponentProps = { router: NextRouter; children: ReactNode };

class PaginationContextProvider extends Component<PaginationComponentProps> {
  static contextType = ErrorContext;
  context!: React.ContextType<typeof ErrorContext>;
  constructor(
    props: PaginationComponentProps | Readonly<PaginationComponentProps>
  ) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    //toggle update effect on any query param change
    toggleCoinsWrapperUpdateEffect();
  }

  render() {
    const router = this.props.router;
    const { setError } = this.context;
    const { page: queryPage, rows: queryRows } = router.query;
    let page, rows;
    console.log(page, rows);
    if (Array.isArray(queryRows)) {
      rows = 10;
    }

    if (Array.isArray(queryPage)) {
      page = 1;
    }

    //Typescript does have not care the if statements
    //have to type cast these

    //@ts-ignore
    page = queryPage ? parseInt(queryPage) : (1 as number);
    //@ts-ignore
    rows = queryRows ? parseInt(queryRows) : (10 as number);

    //must not be smaller than these statements
    if (page < 1) page = 1;
    if (rows < 11) rows = 10;

    //No support over 50
    if (rows > 50) {
      setError(
        "Due to api plan limitations this website cannot bring you more than 50 rows of data"
      );
    }
    console.log({ page, rows });

    return (
      <PaginationContext.Provider value={{ page, rows }}>
        {this.props.children}
      </PaginationContext.Provider>
    );
  }
}

export const usePaginationContext = () => useContext(PaginationContext);

export default withRouter(PaginationContextProvider);

const toggleCoinsWrapperUpdateEffect = () => {
  const wrapper = document.getElementsByClassName("coins-wrapper")[0];
  if (wrapper) wrapper.classList.toggle("rerender");

  setTimeout(() => {
    if (!wrapper) return;
    wrapper.classList.toggle("rerender");
  }, 350);
};
