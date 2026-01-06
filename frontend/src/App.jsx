import { useState, useEffect } from 'react' 
import CandidateCard from './components/CandidateCard' 
import { useVisitorData } from './hooks/useVisitorData';
import Modal from './components/Modal';

function App() {
  const [activeCategory, setActiveCategory] = useState('KING');
  const [candidates, setCandidates] = useState([]); // Stores ALL candidates
  const [loading, setLoading] = useState(true);     // Loading state
  const { visitorId, loading: idLoading } = useVisitorData();
  const [modal, setModal] = useState({ message: '', type: '' }); // { type: 'success' | 'error' }
  const [isVoting, setIsVoting] = useState(false); // To disable buttons while sending

  const categories = ['KING', 'QUEEN', 'MISTER', 'MISS'];

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    fetch('https://fresher-voting-backend.onrender.com/api/candidates/')
      .then(res => res.json())
      .then(data => {
        setCandidates(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // 2. FILTER: Only show candidates for the selected tab
  // Note: We use .startsWith because the category in DB is "KING ( & Prince...)"
  const filteredCandidates = candidates.filter(c => 
    c.category.startsWith(activeCategory)
  );

  const handleVoteClick = async (candidateId) => {
      // 1. Safety Checks
      if (!visitorId) {
        setModal({ type: 'error', message: "Security check failed. Please refresh." });
        return;
      }
      if (isVoting) return; // Prevent double clicks

      setIsVoting(true);

      try {
        // 2. Send Data to Django
        // CHANGED: Pointing to /api/vote/ now
        const response = await fetch('https://fresher-voting-backend.onrender.com/api/vote/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            candidate_id: candidateId,
            device_id: visitorId
          }),
        });

        const data = await response.json();

        // 3. Handle Response
        if (response.ok) {
          setModal({ type: 'success', message: "Your vote has been counted successfully." });
          
          // Optional: Update the local count immediately (UI trick)
          setCandidates(prev => prev.map(c => 
            c.id === candidateId ? {...c, vote_count: c.vote_count + 1} : c
          ));
        } else {
          // Django sent an error (like "Already voted")
          setModal({ type: 'error', message: data.message || "Something went wrong." });
        }

      } catch (error) {
        setModal({ type: 'error', message: "Network error. Is the server running?" });
      } finally {
        setIsVoting(false);
      }
    };

  return (
    <div className="min-h-screen pb-10 bg-gray-50">
      {/* Header */}
      <nav className="bg-blue-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">👑 Fresher Voting 2025</h1>
          <div className="text-sm bg-blue-800 px-3 py-1 rounded-full">Live</div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="container mx-auto mt-6 px-4">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-colors whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto mt-6 px-4">
         {loading ? (
           <div className="text-center text-gray-500 mt-10">Loading candidates...</div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map(person => (
                  <CandidateCard 
                    key={person.id} 
                    candidate={person} 
                    onVote={handleVoteClick} 
                  />
                ))
              ) : (
                <div className="text-center col-span-full text-gray-400 py-10">
                  No candidates found for {activeCategory}.
                </div>
              )}
           </div>
         )}
      </div>
      {modal.message && (
        <Modal 
          message={modal.message} 
          type={modal.type} 
          onClose={() => setModal({ message: '', type: '' })} 
        />
      )}
    </div>
  )
}

export default App