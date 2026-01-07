function CandidateCard({ candidate, onVote, hasVoted }) {
  return (
    <div className={`rounded-xl shadow-md overflow-hidden transition-all border 
      ${hasVoted ? 'bg-green-50 border-green-500 scale-95' : 'bg-white hover:shadow-xl border-gray-100'}`}>
      
      {/* Top Bar */}
      <div className={`h-2 w-full ${hasVoted ? 'bg-green-500' : 'bg-blue-500'}`}></div>
      
      <div className="p-6 text-center">
        {/* Number Badge */}
        <div className="inline-block bg-gray-100 rounded-full px-4 py-1 mb-4">
           <span className="text-sm text-gray-500 font-bold uppercase">Candidate</span>
           <span className="text-xl font-black text-blue-900 ml-2">#{candidate.candidate_number}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1">{candidate.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-6">{candidate.category}</p>

        {/* Dynamic Button */}
        <button 
          onClick={() => !hasVoted && onVote(candidate.id)}
          disabled={hasVoted}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2
            ${hasVoted 
              ? 'bg-green-500 text-white cursor-default' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {hasVoted ? (
            <><span>✓</span> <span>Voted</span></>
          ) : (
             "Vote Now"
          )}
        </button>
      </div>
    </div>
  )
}

export default CandidateCard