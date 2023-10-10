import { Pagination } from "@mui/material";
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
  const [page, setPage] = useState(props.defaultPage);
  const [pageSize, setPageSize] = useState(props.defaultPageSize || 20);
  const initialRender = useRef(true);

  useEffect(() => {
    setPage(props.defaultPage);
    setPageSize(props.defaultPageSize || 20);
  }, [props.defaultPage, props.defaultPageSize]);

  useEffect(() => {
    // Skip the effect on the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    props.updateItems(page, pageSize);
  }, [page, pageSize, props.total, props.params]);

  useEffect(() => {
    if (props.urlSearchName) {
      const params = new URLSearchParams(window.location.search);
      if (params.get(props.urlSearchName) || page !== 1) {
        params.set(props.urlSearchName, `${page}`);
        window.history.pushState("", "", `?${params.toString()}`);
      }
      // router.push(
      //   {
      //     query: { page: page },
      //   },
      //   undefined,
      //   { shallow: true }
      // );
    }
  }, [page]);

  return (
    <Pagination
      page={page}
      count={Math.ceil(props.total / pageSize)}
      onChange={(_e, page) => setPage(page)}
    />
  );
};
