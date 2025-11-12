import React, { useState } from 'react';

interface Curiosity {
  id: number;
  title: string;
  content: string;
  approved: boolean;
  submittedBy?: string;
  submittedAt?: string;
}

const ApprovedCuriosities: React.FC = () => {
  // In a real app, this would come from an API
  const [curiosities, setCuriosities] = useState<Curiosity[]>([
    {
      id: 1,
      title: 'The first computer bug was a literal bug',
      content: "In 1947, Grace Hopper found a moth in the Harvard Mark II computer. It was taped to the logbook as the 'first actual case of bug being found.'",
      approved: true,
      submittedBy: 'grace@example.com',
      submittedAt: '2025-10-28',
    },
    {
      id: 2,
      title: 'The origin of JavaScript',
      content: 'JavaScript was created in just 10 days by Brendan Eich while working at Netscape in 1995.',
      approved: true,
      submittedBy: 'brendan@example.com',
      submittedAt: '2025-10-29',
    },
    {
      id: 3,
      title: 'The first programmer was a woman',
      content: 'Ada Lovelace is considered the first programmer. She wrote the first algorithm intended to be executed by a machine.',
      approved: false,
      submittedBy: 'ada@example.com',
      submittedAt: '2025-10-30',
    },
  ]);

  const toggleApproval = (id: number) => {
    setCuriosities(prev => 
      prev.map(cur => 
        cur.id === id ? { ...cur, approved: !cur.approved } : cur
      )
    );
  };

  const deleteCuriosity = (id: number) => {
    setCuriosities(prev => prev.filter(cur => cur.id !== id));
  };

  return (
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='m-0'>Manage Curiosities</h1>
          <div>
            <span className='mr-3'>
              Total: {curiosities.length} | Approved: {curiosities.filter(c => c.approved).length}
            </span>
          </div>
        </div>

        <div className='grid gap-4'>
          {curiosities.map(curiosity => (
            <article
              key={curiosity.id}>
              <div>
                <h3>{curiosity.title}</h3>
                <div>
                  <button
                    onClick={() => toggleApproval(curiosity.id)}
                  >
                    {curiosity.approved ? 'Approved' : 'Pending'}
                  </button>
                  <button
                    onClick={() => deleteCuriosity(curiosity.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p>{curiosity.content}</p>

              <div>
                Submitted by {curiosity.submittedBy} on {curiosity.submittedAt}
              </div>
            </article>
          ))}
        </div>
      </div>
  );
};

export default ApprovedCuriosities;