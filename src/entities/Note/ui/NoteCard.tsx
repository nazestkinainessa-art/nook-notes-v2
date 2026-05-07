export function NoteCard() {
  return (
    <div>
      <div className="bg-[#fdfbf7] border border-[#e8dfd5] rounded-2xl p-5 w-80 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-[#4a3f35] font-bold text-lg mb-2">биб</h3>
        <div className="inline-block bg-[#c9b198] text-white text-xs px-3 py-1 rounded-full mb-3">
          7 мая 2026
        </div>
        <p className="text-[#755d48] text-sm line-clamp-3">боб</p>
      </div>
    </div>
  );
}
