import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-white">
              Uncivilized Games
            </Link>
            <p className="mt-2 text-gray-400 text-sm max-w-md">
              Semi-coherent rambles about TTRPGs and game design can be found here. 
              Sometimes I work on my games here. Sometimes I scream into the void.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Sometimes, the void screams back.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Site Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/games" className="text-gray-300 hover:text-white">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/apps" className="text-gray-300 hover:text-white">
                    Apps
                  </Link>
                </li>
                <li>
                  <Link href="/guestbook" className="text-gray-300 hover:text-white">
                    Guestbook
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://startplaying.games/gm/uncivilizedgames" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                    StartPlaying.Games
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/uncivilizeddan.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                    BlueSky
                  </a>
                </li>
                <li>
                  <a href="https://discordapp.com/users/330898240805404672" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-8 flex flex-col md:flex-row md:justify-between">
          <p className="text-sm text-gray-400">
            © {currentYear} Uncivilized Games. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}