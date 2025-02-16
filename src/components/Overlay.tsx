interface OverlayProps {
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
      <div
        className="bg-white shadow-2xl border-t-1 border-gray-200 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
