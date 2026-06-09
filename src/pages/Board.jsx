import { useState } from 'react';
import boardData from '../assets/mock/boardData';
import Paging from './Paging';
import BoardWriteModal from './BoardWriteModal';

const PAGE_SIZE = 10;

function formatToday() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(
    [...boardData].sort((a, b) => b.id - a.id)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = posts.slice(start, start + PAGE_SIZE);

  const handleSave = ({ title, content }) => {
    const nextId = posts.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const newPost = {
      id: nextId,
      title,
      content,
      author: '관리자',
      views: 0,
      updatedAt: formatToday(),
    };
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-5 px-10 py-8">
      <div className="flex items-center gap-2">
        <h1 className="text-[22px] font-bold text-[#1A1A1A]">게시판</h1>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center rounded-md bg-[#2563EB] px-5 py-2 text-sm font-medium text-white"
        >
          글쓰기
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-md bg-[#DC2626] px-5 py-2 text-sm font-medium text-white"
        >
          삭제
        </button>
      </div>

      <div className="h-[528px]">
        <div className="flex flex-col overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">
          <div className="flex h-12 items-center border-b border-[#E5E7EB] bg-[#F8FAFC]">
            <div className="flex w-12 items-center justify-center">
              <input type="checkbox" className="h-[18px] w-[18px] rounded border-[1.5px] border-[#D1D5DB]" />
            </div>
            <div className="flex w-20 items-center justify-center text-[13px] font-semibold text-[#6B7280]">글번호</div>
            <div className="flex flex-1 items-center px-4 text-[13px] font-semibold text-[#6B7280]">글제목</div>
            <div className="flex w-[120px] items-center justify-center text-[13px] font-semibold text-[#6B7280]">글쓴이</div>
            <div className="flex w-[100px] items-center justify-center text-[13px] font-semibold text-[#6B7280]">조회수</div>
            <div className="flex w-40 items-center justify-center text-[13px] font-semibold text-[#6B7280]">최종수정일</div>
          </div>

          {pageItems.map((item) => (
            <div key={item.id} className="flex h-12 items-center border-b border-[#E5E7EB]">
              <div className="flex w-12 items-center justify-center">
                <input type="checkbox" className="h-[18px] w-[18px] rounded border-[1.5px] border-[#D1D5DB]" />
              </div>
              <div className="flex w-20 items-center justify-center text-[13px] text-[#6B7280]">{item.id}</div>
              <div className="flex flex-1 items-center px-4 text-sm text-[#1A1A1A]">{item.title}</div>
              <div className="flex w-[120px] items-center justify-center text-[13px] text-[#6B7280]">{item.author}</div>
              <div className="flex w-[100px] items-center justify-center text-[13px] text-[#6B7280]">{item.views}</div>
              <div className="flex w-40 items-center justify-center text-[13px] text-[#6B7280]">{item.updatedAt}</div>
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
