function Paging({ currentPage, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const boxClass =
    'flex h-9 w-9 items-center justify-center rounded-md text-sm';

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        type="button"
        className={`${boxClass} border border-[#E5E7EB] bg-white text-[#6B7280] disabled:opacity-40`}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        {'<'}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage
              ? `${boxClass} bg-[#2563EB] font-medium text-white`
              : `${boxClass} border border-[#E5E7EB] bg-white font-medium text-[#1A1A1A]`
          }
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={`${boxClass} border border-[#E5E7EB] bg-white text-[#6B7280] disabled:opacity-40`}
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Paging;
