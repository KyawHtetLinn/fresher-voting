function CandidateCard({ candidate, onVote }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
      <div className="h-2 bg-blue-500 w-full"></div>

      <div className="p-6 text-center">
        <div className="inline-block bg-gray-100 rounded-full px-4 py-1 mb-4">
           <span className="text-sm text-gray-500 font-bold uppercase">Candidate</span>
           <span className="text-xl font-black text-blue-900 ml-2">#{candidate.candidate_number}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1">{candidate.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-6">{candidate.category}</p>

        <button 
          onClick={() => onVote(candidate.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          <span>Vote Now</span>
        </button>
      </div>
    </div>
  )
}

export default CandidateCard