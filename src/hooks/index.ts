import useSWR from 'swr';

import { fetcher } from 'api';

export function usePosts() {
  const { data, error } = useSWR(`api/posts`, fetcher);
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

export function usePostsByType(idType) {
  const { data, error } = useSWR(`api/posts?type=${idType}`, fetcher);
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
