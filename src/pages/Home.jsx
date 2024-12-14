import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import NewsContext from '../context/NewsContext';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const store = useContext(NewsContext);

  const getNews = async () => {
    const searchTerm = store.news || 'latest'; // Default search term if empty

    try {
      setLoading(true);
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=94b356fac4624469a1f6cba75841d50c`
      );
      setData(response.data.articles);
      setError(null); // Clear previous errors
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [store.news]); // Run getNews whenever `store.news` changes

  const handleBookmark = (article) => {
    const isBookmarked = bookmarks.some((bookmark) => bookmark.url === article.url);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.url !== article.url));
    } else {
      setBookmarks([...bookmarks, article]);
    }
  };

  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
        console.log("Article shared successfully");
      } catch (error) {
        console.error("Error sharing the article:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row pt-16 gap-4 w-full  h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-900 p-5 gap-5 w-full">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          data.map((ele, index) => (
            ele.urlToImage && (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 w-full"
              >
                <img
                  src={ele.urlToImage || 'https://via.placeholder.com/150'}
                  alt="News"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{ele.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {ele.description || 'No description available.'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                    <span className="font-medium">{ele.source.name}</span>
                    <span>{new Date(ele.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleBookmark(ele)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {bookmarks.some((bookmark) => bookmark.url === ele.url) ? 'Unbookmark' : 'Bookmark'}
                    </button>
                    <button
                      onClick={() => handleShare(ele)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
      <SideBar searchTerm={store.news} /> {/* Pass the searchTerm to the SideBar */}
    </div>
  );
};

export default Home;
