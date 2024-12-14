import React, { useEffect, useState } from 'react';

const SideBar = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNewsHeadlines = async () => {
    try {
      setLoading(true);
      let res = await fetch(`https://newsapi.org/v2/top-headlines?q=${searchTerm}&country=us&apiKey=94b356fac4624469a1f6cba75841d50c`
      );
      let newsData = await res.json();
      setData(newsData.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching headlines:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsHeadlines();
  }, [searchTerm]); // Re-run when searchTerm changes

  return (
    <div className="p-4 bg-gray-800 text-white w-[20%]">
      <style>
        {`
          .scrolling-news {
            display: flex;
            flex-direction: column;
            animation: scrollUp 70s linear infinite;
          }

          @keyframes scrollUp {
            0% {
              transform: translateY(0%);
            }
            100% {
              transform: translateY(-100%);
            }
          }

          .scrolling-news:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="fixed z-80 w-[16%] right-0 mr-3 p-4 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-bold mb-4 border-b pb-2">Top Headlines</h1>
        <div className="overflow-hidden h-[85vh] relative">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <div className="scrolling-news space-y-4">
              {data.map((item, index) => (
                <a
                  key={index}
                  href={item.url} // Link to the news source
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Security measure for external links
                  className="block p-3 bg-gray-700 rounded-lg transition transform hover:scale-105 shadow-lg hover:bg-gray-600"
                >
                  <h2 className="text-sm font-semibold mb-1 line-clamp-2">{item.title}</h2>
                  <p className="text-xs text-gray-300">
                    {item.source.name} • {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
