import ReactPortal from "./react-portal";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export default function Modal({ children, isOpen }: ModalProps) {
  return (
    <ReactPortal wrapperId="modal">
      {isOpen && (
        <aside className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            {children}
          </section>
        </aside>
      )}
    </ReactPortal>
  );
}
