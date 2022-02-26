import { FC } from 'react';
import { PostListItem } from '../../types';
import styles from './PostItemForm.module.scss';

interface PostItemFormProps {
  index: number;
  postListItem: PostListItem;
  onEdit(id: number): void;
  onDelete(id: number): void;
}

export const PostItemForm: FC<PostItemFormProps> = ({
  postListItem,
  index,
  onEdit,
  onDelete,
}) => {
  const handleEditBtnClk = () => {
    onEdit(postListItem.id);
  };

  const handleDeleteBtnClk = () => {
    onDelete(postListItem.id);
  };

  return (
    <div className="border rounded p-2 d-flex flex-column gap-2">
      <div className="justify-content-between d-flex">
        [id={postListItem.id}]
        <div className={`d-flex gap-2 ${styles.btnsWrap}`}>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleEditBtnClk}
          >
            edit
          </button>
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={handleDeleteBtnClk}
          >
            delete
          </button>
        </div>
      </div>

      <div className="text-center fw-bold">
        {index}. {postListItem.title}
      </div>
      <div>{postListItem.body}</div>
    </div>
  );
};
