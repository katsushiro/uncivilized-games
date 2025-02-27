export default function GuestbookPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Guestbook
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-300 mb-8">
          Leave a message, share your thoughts, or just say hello!
        </p>
        
        <form className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
            <textarea 
              id="message" 
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Sign Guestbook
          </button>
        </form>
        
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-white">Visitor</h3>
              <span className="text-gray-400 text-sm">February 20, 2025</span>
            </div>
            <p className="text-gray-300">Love your games! Can't wait to join the next session.</p>
          </div>
        </div>
      </div>
    </div>
  );
}