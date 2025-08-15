import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p>The page you are looking for does not exist</p>
      <Link href="/" className="mt-4 inline-block text-blue-400 underline">
        Go back to Home
      </Link>
    </div>
  );
}
