import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Replace this with the path to your actual page
    }, 3000); // Replace this with the desired time in milliseconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <img src="/richin.gif" alt="Loading..." />
    </div>
  );
}

export default Loading;
