import { Inter } from 'next/font/google'
import SearchBar from '../components/SearchBar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col bg-[url('/woman-reading-book.svg')] bg-contain  bg-no-repeat items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        

        </div>
      </div>

      <div className="relative flex place-items-center flex-1 ml-1 w-3/4">
        <SearchBar onSearch={(query) => console.log('Search:', query)} shadow={true} />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        
      </div>
    </main>
  )
}
