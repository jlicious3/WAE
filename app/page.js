import Image from "next/image";
import Head from "next/head";
import Link from 'next/link';
import { DiWindows } from "react-icons/di";

export default function Home() {
  return (
    <>
      {/* Add the Head component here */}
      <Head>
        <title>W.A.E. Tracker</title>
      </Head>
    
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="pt-6 pb-4">
      <Image src="/image/wae-logo.png" alt="SAIT Logo" width="200" height="200" />
      </div>

      <div className="font-mono text-black hover:bg-blue-500 font-bold border-4 border-black py-2 px-4 rounded-full inline-block">
      <Link href="/tracking"> Start Tracking </Link>
      </div>

      <Image className="pt-5 pl-5 pb-10" src="/image/icons-footer.jpg" alt="icons-footer" width="500" height="200" />
      
      <div className="text-black flex-grow flex-grow items-end">  
      <footer className="flex justify-center items-end space-x-8 pt-20 pb-5">
      <DiWindows size={30} />
      <Image src="/image/sait-logo.jpg" alt="SAIT Logo" width="100" height="100" />
      </footer>
      </div>
      </main>
    </>
  );
}
