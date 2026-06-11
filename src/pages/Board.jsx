import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  fetchBoards,
  writeBoard,
  removeBoards,
} from '../service/boardService';
import useAuthStore from '../store/authStore';
import Paging from './Paging';
import BoardWriteModal from './BoardWriteModal';

const PAGE_SIZE = 10;

function Board() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);

  const pageItems = posts;

  const loadBoards = () => {
    fetchBoards(currentPage - 1, PAGE_SIZE).then(({ items, totalPages }) => {
      setPosts(items);
      setTotalPages(totalPages);
      setCheckedIds([]);
    });
  };

  useEffect(() => {
    loadBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // 3.3 게시글 등록
  const handleSave = async ({ title, content }) => {
    await writeBoard(title, content);
    setIsModalOpen(false);
    if (currentPage === 1) {
      loadBoards();
    } else {
      setCurrentPage(1);
    }
  };

  // 체크박스 단건 토글
  const toggleCheck = (boardId) => {
    setCheckedIds((prev) =>
      prev.includes(boardId)
        ? prev.filter((id) => id !== boardId)
        : [...prev, boardId]
    );
  };

  // 전체 선택 토글
  const toggleCheckAll = () => {
    if (checkedIds.length === pageItems.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(pageItems.map((item) => item.boardId));
    }
  };

  // 3.4 목록 화면에서 선택 삭제
  const handleDeleteSelected = async () => {
    if (checkedIds.length === 0) {
      alert('삭제할 게시글을 선택하십시오.');
      return;
    }
    if (!window.confirm('선택된 게시글들을 정말 삭제하시겠습니까?')) return;
    await removeBoards(checkedIds);
    loadBoards();
  };

  return (
    <div className="flex flex-col gap-5 px-10 py-8">
      <div className="flex items-center gap-2">
        <h1 className="text-[22px] font-bold text-[#1A1A1A]">게시판</h1>
        <div className="flex-1" />
        {isLoggedIn && (
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center rounded-md bg-[#2563EB] px-5 py-2 text-sm font-medium text-white"
            >
              글쓰기
            </button>
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="flex items-center justify-center rounded-md bg-[#DC2626] px-5 py-2 text-sm font-medium text-white"
            >
              삭제
            </button>
          </>
        )}
      </div>

      <div className="h-[528px]">
        <div className="flex flex-col overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">
          <div className="flex h-12 items-center border-b border-[#E5E7EB] bg-[#F8FAFC]">
            <div className="flex w-12 items-center justify-center">
              <input
                type="checkbox"
                checked={pageItems.length > 0 && checkedIds.length === pageItems.length}
                onChange={toggleCheckAll}
                className="h-[18px] w-[18px] rounded border-[1.5px] border-[#D1D5DB]"
              />
            </div>
            <div className="flex w-20 items-center justify-center text-[13px] font-semibold text-[#6B7280]">글번호</div>
            <div className="flex flex-1 items-center px-4 text-[13px] font-semibold text-[#6B7280]">글제목</div>
            <div className="flex w-[120px] items-center justify-center text-[13px] font-semibold text-[#6B7280]">글쓴이</div>
            <div className="flex w-[100px] items-center justify-center text-[13px] font-semibold text-[#6B7280]">조회수</div>
            <div className="flex w-40 items-center justify-center text-[13px] font-semibold text-[#6B7280]">등록일</div>
          </div>

          {pageItems.map((item) => (
            <div key={item.boardId} className="flex h-12 items-center border-b border-[#E5E7EB]">
              <div className="flex w-12 items-center justify-center">
                <input
                  type="checkbox"
                  checked={checkedIds.includes(item.boardId)}
                  onChange={() => toggleCheck(item.boardId)}
                  className="h-[18px] w-[18px] rounded border-[1.5px] border-[#D1D5DB]"
                />
              </div>
              <div className="flex w-20 items-center justify-center text-[13px] text-[#6B7280]">{item.boardId}</div>
              <div className="flex flex-1 items-center px-4 text-sm text-[#1A1A1A]">
                <button
                  type="button"
                  onClick={() => navigate(`/board/${item.boardId}`)}
                  className="text-left hover:text-[#2563EB] hover:underline"
                >
                  {item.title}
                </button>
              </div>
              <div className="flex w-[120px] items-center justify-center text-[13px] text-[#6B7280]">{item.writer}</div>
              <div className="flex w-[100px] items-center justify-center text-[13px] text-[#6B7280]">{item.readCount}</div>
              <div className="flex w-40 items-center justify-center text-[13px] text-[#6B7280]">{item.createAt?.slice(0, 10)}</div>
            </div>
          ))}
        </div>
      </div>

      <Paging
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />

      {isModalOpen && (
        <BoardWriteModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Board;
