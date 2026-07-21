import Image from "next/image";

const features = [
  {
    icon: "/why/icon-verified.png",
    title: "Verified Experts",
    description: "Carefully screened & experienced",
  },
  {
    icon: "/why/icon-confidential.png",
    title: "100% Confidential",
    description: "Your privacy is our priority",
  },
  {
    icon: "/why/icon-live.png",
    title: "Live Interactive",
    description: "Real-time sessions & conversations",
  },
  {
    icon: "/why/icon-personalized.png",
    title: "Personalized Guidance",
    description: "Tailored for your unique journey",
  },
  {
    icon: "/why/icon-trusted.png",
    title: "Trusted by 50,000+",
    description: "Souls across the globe",
  },
];

export default function WhySoulSensei() {
  return (
    <section className="relative w-full bg-[#1A1A4A] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="why-panel overflow-hidden rounded-2xl">
          <div className="why-panel-inner flex flex-col items-stretch gap-8 px-5 py-7 sm:px-7 sm:py-8 lg:flex-row lg:items-center lg:gap-5 lg:px-8 lg:py-9 xl:gap-6 xl:px-10 xl:py-10">
            {/* Left */}
            <div className="shrink-0 lg:w-[210px] xl:w-[230px]">
              <p
                className="text-[13px] font-medium leading-none text-[#3D3D8F] sm:text-[14px]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Why SoulSensei?
              </p>
              <h2
                className="mt-1.5 text-[20px] font-medium leading-[1.15] text-[#1A1A4A] sm:text-[21px] lg:text-[22px] xl:text-[23px]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                A Safe Space For
                <br />
                Your Transformation
              </h2>
              <a
                href="/about"
                className="why-know-more mt-5 inline-flex items-center rounded-full px-5 py-2.5 text-[12px] font-medium text-[#1A1A4A] sm:mt-6 sm:px-6 sm:py-3 sm:text-[13px]"
              >
                Know More About Us
              </a>
            </div>

            {/* Center features */}
            <div className="why-features flex flex-1 flex-wrap items-start justify-center gap-x-4 gap-y-7 sm:gap-x-5 lg:flex-nowrap lg:justify-between lg:gap-x-2 xl:gap-x-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex w-[calc(50%-8px)] flex-col items-center text-center sm:w-[calc(33.333%-14px)] lg:w-auto lg:min-w-0 lg:flex-1"
                >
                  <div className="relative mb-2.5 h-[68px] w-[68px] sm:mb-3 sm:h-[76px] sm:w-[76px] lg:h-[72px] lg:w-[72px] xl:h-[80px] xl:w-[80px]">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                      quality={95}
                    />
                  </div>
                  <h3 className="text-[11px] font-semibold leading-tight text-[#3D3D8F] sm:text-[12px] lg:text-[11px] xl:text-[12px]">
                    {feature.title}
                  </h3>
                  <p className="mt-1 max-w-[108px] text-[9px] leading-[1.35] text-[#5A5A7A] sm:max-w-[120px] sm:text-[10px] lg:text-[9px] xl:text-[10px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right lotus */}
            <div className="relative mx-auto h-[150px] w-full max-w-[210px] shrink-0 sm:h-[170px] sm:max-w-[230px] lg:mx-0 lg:h-[190px] lg:w-[190px] lg:max-w-none xl:h-[210px] xl:w-[210px]">
              <Image
                src="/why/lotus.png"
                alt="Glowing lotus flower"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 230px, 210px"
                quality={95}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
