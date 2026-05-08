import React from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { MdClose } from "react-icons/md";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const NoteModal = ({ isOpen, onClose, children }: NoteModalProps) => {
  return (
    <div>
      {isOpen && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
          <div
            className=" relative bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl "
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" relative m-5 w-full max-w-150">
              <Button
                variant="icon"
                size="icon"
                className=" absolute  right-5 "
                onClick={() => onClose()}
              >
                <MdClose></MdClose>
              </Button>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
