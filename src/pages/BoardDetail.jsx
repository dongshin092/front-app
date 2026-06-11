import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  fetchBoard,
  editBoard,
  removeBoards,
} from '../service/boardService';
import useAuthStore from '../store/authStore';

function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [board, setBoard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    fetchBoard(boardId).then((data) => {
      setBoard(data);
      setTitle(data.title);
      setContents(data.contents);
    });
  }, [boardId]);

  // 3.2.1 수정 진행
  const handleUpdate = async () => {
    if (title.trim() === '') return;
    await editBoard(boardId, title.trim(), contents.trim());
    const data = await fetchBoard(boardId);
    setBoard(data);
    setIsEditing(false);
  };

  // 3.2.2 삭제 진행
  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await removeBoards([boardId]);
    navigate('/board');
  };

  if (!board) {
    return <div className="px-10 py-8 text-sm text-[#6B7280]">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col gap-5 px-10 py-8">
      <div className="flex flex-col gap-4 rounded-lg border border-[#E5E7EB] bg-white p-8">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-lg border border-[#E5E7EB] px-3.5 text-lg font-bold text-[#1A1A1A]"
          />
        ) : (
          <h1 className="text-[22px] font-bold text-[#1A1A1A]">{board.title}</h1>
        )}

        <div className="flex gap-4 border-b border-[#E5E7EB] pb-4 text-[13px] text-[#6B7280]">
          <span>글쓴이: {board.writer}</span>
          <span>조회수: {board.readCount}</span>
          <span>{board.createAt?.slice(0, 10)}</span>
        </div>

        {isEditing ? (
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="h-64 resize-none rounded-lg border border-[#E5E7EB] p-3.5 text-sm text-[#1A1A1A]"
          />
        ) : (
          <div className="min-h-[200px] whitespace-pre-wrap text-sm text-[#1A1A1A]">
            {board.contents}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-md bg-[#16A34A] px-5 py-2 text-sm font-medium text-white"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-md border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A]"
            >
              취소
            </button>
          </>
        ) : (
          <>
            {isLoggedIn && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-md bg-[#16A34A] px-5 py-2 text-sm font-medium text-white"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-md bg-[#DC2626] px-5 py-2 text-sm font-medium text-white"
                >
                  삭제
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => navigate('/board')}
              className="rounded-md bg-[#6B7280] px-5 py-2 text-sm font-medium text-white"
            >
              목록
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BoardDetail;
