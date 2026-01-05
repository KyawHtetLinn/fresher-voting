function Modal({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center animate-bounce-in">
        
        {/* Icon based on type */}
        <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
          type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {type === 'success' ? '✓' : '!'}
        </div>

        <h3 className={`text-xl font-bold mb-2 ${
          type === 'success' ? 'text-gray-800' : 'text-red-600'
        }`}>
          {type === 'success' ? 'Vote Recorded!' : 'Vote Failed'}
        </h3>
        
        <p className="text-gray-600 mb-6">{message}</p>

        <button 
          onClick={onClose}
          className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal