function CandidateCard({ candidate, onVote, hasVoted }) {
  return (
    <div className={`rounded-xl shadow-md overflow-hidden transition-all border border-gray-200 
      ${hasVoted ? 'bg-green-50 border-green-500 scale-95' : 'bg-white hover:shadow-xl border-gray-100'}`}>
      
      {/* Top Bar */}
      <div className={`h-3 w-full ${hasVoted ? 'bg-green-400' : 'bg-blue-400'}`}></div>
      
      <div className="p-2 text-center">
        <div className="inline-block bg-gray-100 rounded-full px-4 py-1 mb-2">
           {/* <span className="text-sm text-gray-500 font-bold uppercase">Candidate</span> */}
           <span className="font-display font-extrabold text-l font-black text-blue-900 ml-2">No. {candidate.candidate_number}</span>
        </div>

        <h3 className="text-l font-bold text-gray-800 mb-5">{candidate.name}</h3>

        <button 
          onClick={() => !hasVoted && onVote(candidate.id)}
          disabled={hasVoted}
          className={`w-full font-display font-extrabold py-1 rounded-lg transition-colors flex justify-center items-center gap-2
            ${hasVoted 
              ? 'bg-green-500 text-white cursor-default' 
              : 'bg-cyan-600 hover:bg-blue-700 text-white'}`}
        >
          {hasVoted ? (
            <><span>✓</span> <span>Voted</span></>
          ) : (
             "Vote"
          )}
        </button>
      </div>
    </div>
  )
}

export default CandidateCard