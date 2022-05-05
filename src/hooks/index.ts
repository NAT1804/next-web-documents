import useSWR from 'swr';

import { fetcher } from 'api';

export function usePosts(page) {
  const { data, error } = useSWR(`api/posts?page=${page}`, fetcher);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  };
}

export function usePostById(idPost) {
  const { data, error } = useSWR(`api/posts/${idPost}`, fetcher);
  return {
    post: data,
    isLoading: !error && !data,
    isError: error
  };
}

export function usePostsByType(idType, page) {
  const { data, error } = useSWR(
    `api/posts?type=${idType}&page=${page}`,
    fetcher
  );
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useFile(fileId) {
  const { data, error } = useSWR(`api/posts/file/${fileId}`, fetcher);
  return {
    file: data,
    isLoading: !error && !data,
    isError: error
  };
}

export function usePostType() {
  const { data, error } = useSWR(`api/post-type`, fetcher);
  return {
    postType: data,
    isLoading: !error && !data,
    isError: error
  };
}
