import {Button} from "../../../shared/ui/Button/Button";
import type { Note } from "../../../entities/Note/model/types";
import type { Exercise } from "../../../entities/Training/model/types";
import ReactMarkdown from "react-markdown";

interface DayDetailsModalProps {
  selectedDay: number;
  monthName: string;
  year: number;
  dayNotes: Note[];
  dayTrainings: { workoutName: string; templateTitle: string; exercises: Exercise[] }[];
  onClose: () => void;
}

export function DayDetailsModal({ selectedDay, monthName, year, dayNotes, dayTrainings, onClose }: DayDetailsModalProps) {
    return (
        <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a3f35]/20 backdrop-blur-sm p-4"
                  onClick={onClose}
                >
                  <div
                    className="relative bg-[#fdfbf7] rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-[#e8dfd5] flex flex-col gap-6 max-h-[85vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center border-b border-[#e8dfd5] pb-4">
                      <h2 className="text-xl font-bold text-[#4a3f35] flex items-center gap-2">
                        <span className="text-2xl">📅</span> {selectedDay}{" "}
                        {monthName} {year}
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="w-7 h-7 rounded-full bg-[#f5f1e6] font-bold pb-1 text-xl"
                      >
                        &times;
                      </Button>
                    </div>
                    <div className="overflow-y-auto pr-2 flex flex-col gap-8 custom-scrollbar">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-[#c4a484] uppercase tracking-widest bg-[#f5f1e6] w-fit px-3 py-1 rounded-lg">
                          Заметки
                        </h3>
                        {dayNotes.length === 0 ? (
                          <p className="text-sm text-[#755d48] opacity-60 italic pl-1">
                            Заметок не найдено
                          </p>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {dayNotes.map((note) => (
                              <div
                                key={note.id}
                                className="bg-white border border-[#e8dfd5] p-5 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
                              >
                                <h4 className="font-bold text-lg text-[#4a3f35]">
                                  {note.title}
                                </h4>
                                {note.content && (
                                  <div className="text-[#755d48] text-sm leading-relaxed bg-[#fdfbf7] p-4 rounded-xl border border-[#f5f1e6] [&_h1]:text-base [&_h1]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:ml-4">
                                    <ReactMarkdown>{note.content}</ReactMarkdown>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-[#c4a484] uppercase tracking-widest bg-[#fff1da] w-fit px-3 py-1 rounded-lg">
                          Тренировки
                        </h3>
                        {dayTrainings.length === 0 ? (
                          <p className="text-sm text-[#755d48] opacity-60 italic pl-1">
                            Тренировок не запланировано
                          </p>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {dayTrainings.map((t, idx) => (
                              <div
                                key={idx}
                                className="bg-white border border-[#ffe0b2] p-5 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div className="font-bold text-lg text-[#4a3f35] flex items-center gap-2">
                                  <span className="bg-[#fff1da] p-2 rounded-xl text-xl">
                                    ⚡
                                  </span>
                                  <div className="flex flex-col">
                                    <span>{t.workoutName}</span>
                                    <span className="text-xs font-normal text-[#c4a484]">
                                      {t.templateTitle}
                                    </span>
                                  </div>
                                </div>
        
                                {t.exercises?.length > 0 ? (
                                  <div className="flex flex-col gap-2 bg-[#fdfbf7] border border-[#f5f1e6] p-3 rounded-xl">
                                    {t.exercises.map((ex) => (
                                      <div
                                        key={ex.id}
                                        className="text-sm text-[#755d48] flex justify-between items-center border-b border-[#e8dfd5] pb-2 last:border-none last:pb-0"
                                      >
                                        <span className="font-bold text-[#4a3f35]">
                                          {ex.name}
                                        </span>
                                        <span className="font-mono text-xs bg-white px-2 py-1 rounded-md text-[#c4a484] border border-[#e8dfd5]">
                                          {ex.sets} x {ex.reps}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-xs text-[#755d48] italic opacity-60">
                                    Упражнения не добавлены
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
    )
}