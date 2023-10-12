import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type PaginationControlProps = {
  defaultPage: number;
  defaultPageSize?: number;
  total: number;
  params?: any;
  urlSearchName?: string;
  updateItems: (page: number, pageSize: number) => Promise<void>;
};

export const PaginationControl: React.FC<PaginationControlProps> = (props) => {
  const [pageSize, setPageSize] = useState(props.defaultPageSize || 20);
  const initialRender = useRef(true);
  const router = useRouter();
  let paramPage = null;
  if (props.urlSearchName) {
    const paramPageStr = router.query[props.urlSearchName];
    if (typeof paramPageStr == "string") {
      paramPage = parseInt(paramPageStr);
    }
  }
  const [page, setPage] = useState(paramPage || props.defaultPage);

  // useEffect(() => {
  //   console.log("default change");
  //   setPage(props.defaultPage);
  //   setPageSize(props.defaultPageSize || 20);
  // }, [props.defaultPage, props.defaultPageSize]);

  useEffect(() => {
    // Skip the effect on the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    props.updateItems(page, pageSize);
    if (props.urlSearchName) {
      // const params = new URLSearchParams(window.location.search);
      // if (params.get(props.urlSearchName) || page !== 1) {
      //   params.set(props.urlSearchName, `${page}`);
      //   window.history.pushState("", "", `?${params.toString()}`);
      // }
      const paramPage = router.query[props.urlSearchName];
      if (!paramPage && page === 1) {
        return;
      }
      if (paramPage === `${page}`) {
        return;
      }
      router.push(
        {
          query: { [props.urlSearchName]: page },
          pathname: router.pathname,
        },
        undefined
        // { shallow: true }
      );
    }
  }, [page, pageSize, props.total, props.params]);

  return (
    <Pagination
      page={page}
      count={Math.ceil(props.total / pageSize)}
      onChange={(_e, page) => setPage(page)}
    />
  );
};
