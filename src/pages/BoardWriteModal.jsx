import { useState } from 'react';

const TITLE_MAX = 50;
const CONTENT_MAX = 800;

function BoardWriteModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (title.trim() === '') return;
    onSave({ title: title.trim(), content: content.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-[520px] flex-col gap-5 rounded-xl bg-white p-8">
        <h2 className="text-xl font-bold text-[#1A1A1A]">게시글 작성</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1A1A1A]">제목</label>
          <input
            type="text"
            value={title}
            maxLength={TITLE_MAX}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="h-11 rounded-lg border border-[#E5E7EB] px-3.5 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]"
          />
          <span className="self-end text-xs text-[#6B7280]">
            {title.length} / {TITLE_MAX}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1A1A1A]">내용</label>
          <textarea
            value={content}
            maxLength={CONTENT_MAX}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="h-48 resize-none rounded-lg border border-[#E5E7EB] p-3.5 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]"
          />
          <span className="self-end text-xs text-[#6B7280]">
            {content.length} / {CONTENT_MAX}
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center justify-center rounded-md bg-[#2563EB] px-5 py-2 text-sm font-medium text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardWriteModal;
