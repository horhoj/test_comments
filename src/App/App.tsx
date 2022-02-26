import { FC, useEffect } from 'react';
import { Router } from '../router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postListSlice } from '../features/PostList/postListSlice';
import { RequestErrorMSG } from '../components/RequestErrorMSG';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const postLoadRequestError = useAppSelector(
    postListSlice.selectors.getRequestError,
  );
  const postList = useAppSelector(postListSlice.selectors.getPostList);

  useEffect(() => {
    dispatch(postListSlice.thunks.getPostListRequest());
  }, []);

  return (
    <div className="container mt-2">
      {postLoadRequestError ? (
        <RequestErrorMSG
          requestError={postLoadRequestError}
          title={'Error post load!'}
        />
      ) : null}

      <div>{postList ? <Router /> : null}</div>
    </div>
  );
};
