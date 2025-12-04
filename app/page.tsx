import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main>
      {/* ❌ ลบ section hero ทิ้ง เพราะ Hero อยู่ใน layout แล้ว */}

      <section
        id="next-section"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl tracking-widest p-3">WE ONBOARDING</h2>
      </section>
    </main>
  );
}
