'use client';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-am-bg">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-md"/>
          <span className="font-public-sans text-lg font-semibold">Alicia Martinelli</span>
        </div>
      </div>
    </header>
  );
}
