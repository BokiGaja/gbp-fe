export default function AboutHero() {
  return (
    <section className="w-full bg-white pb-12 md:pb-36">
      <div className="mx-auto flex flex-col md:flex-row items-center md:items-center tracking-wider">
        {/* Left: Text */}
        <div className="flex-1 min-w-[260px]">
          <h1 className="text-4xl md:text-5xl font-[500] text-[#000D2D] mb-6 leading-tight">
            A military company that is
            <span className="hidden md:inline"><br /></span>
            <span className="inline md:hidden"> </span>
            a licensed industry leader
          </h1>
          <p className="text-[#000D2D] opacity-70 text-base md:text-l font-[400] max-w-md">
            Our cutting-edge armored vehicles deliver unparalleled protection and performance.
          </p>
        </div>
        {/* Right: Logos grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-px w-full max-w-lg aspect-square bg-white rounded-lg pt-10 px-6">
            {/* GBP logo centered on top row, spanning two columns */}
            <div className="flex items-center justify-center col-span-2 p-4 bg-[#F5F5F5]">
              <img src="/gbp-logo.png" alt="Logo 1" width={120} height={120} />
            </div>
            {/* Bottom row: two logos */}
            <div className="flex items-center justify-center p-4 bg-[#F5F5F5]">
              <img src="/idmir-logo.png" alt="Logo 2" width={120} height={120} />
            </div>
            <div className="flex items-center justify-center p-4 bg-[#F5F5F5]">
              <img src="/dj-logo.png" alt="Logo 3" width={120} height={120} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 