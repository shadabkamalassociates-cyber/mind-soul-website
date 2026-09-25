import Image from "next/image";
import VedicHealingJoinForm from "@/components/vedicHealing/VedicHealingJoinForm";
import { JUST99_ASSETS, JUST99_HERO_FEATURES } from "@/components/communityJoin/just99Assets";
import { COMMUNITY_JOIN_PRICE_INR } from "@/services/communityJoinService";

export default function VedicHealingHero() {
  return (
    <section className="just99-split relative w-full overflow-hidden">
      <div className="just99-page relative">
        <div className="just99-bg-decor pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <Image
            src={JUST99_ASSETS.vine}
            alt=""
            width={180}
            height={462}
            unoptimized
            className="just99-bg-vine just99-bg-vine-left object-contain"
          />
          <Image
            src={JUST99_ASSETS.vine}
            alt=""
            width={180}
            height={462}
            unoptimized
            className="just99-bg-vine just99-bg-vine-right object-contain"
          />
          <div className="just99-bg-mountains" />
        </div>

        <div className="just99-main just99-main-landing just99-main-split relative z-[2]">
          <div className="just99-left relative flex min-h-0 flex-col justify-center overflow-visible">
            <div className="just99-left-inner relative z-[1]">
              <div className="just99-split-copy">
                <span className="just99-split-badge">
                  <span className="just99-split-badge-dot" aria-hidden />
                  Just ₹{COMMUNITY_JOIN_PRICE_INR} Community
                </span>
                <div className="just99-webinar-chip">
                  <span className="just99-webinar-chip-label">Upcoming Webinar</span>
                  <p className="just99-webinar-chip-dates">Coming Soon</p>
                </div>
                <h1 className="just99-split-title">
                  <span>Reconnect With</span>
                  <span>Your Inner</span>
                  <span className="just99-split-title-gold">Balance.</span>
                </h1>
                <p className="just99-split-desc">
                  Discover the ancient wisdom of Vedic healing and restore harmony to your mind, body and energy.
                </p>
                <div className="just99-split-features">
                  {JUST99_HERO_FEATURES.map((item) => (
                    <div key={item.title} className="just99-split-feature">
                      <span className="just99-split-feature-icon">
                        <Image
                          src={item.image}
                          alt=""
                          width={28}
                          height={28}
                          unoptimized
                          className="just99-asset-img object-contain"
                          style={{ width: 28, height: 28 }}
                        />
                      </span>
                      <div>
                        <p className="just99-split-feature-title">{item.title}</p>
                        <p className="just99-split-feature-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="just99-hero-center just99-hero-center-landing" aria-hidden>
            <div className="just99-hero-ripple-rings" />
            <div className="just99-hero-portrait-glow" />
            <div className="just99-hero-portrait-ring">
              <div className="just99-hero-portrait-crescent" aria-hidden />
              <Image
                src={JUST99_ASSETS.heroPortrait}
                alt=""
                width={640}
                height={640}
                unoptimized
                priority
                className="just99-hero-portrait-img"
              />
            </div>
          </div>

          <div className="just99-right relative flex min-h-0 flex-col justify-center overflow-visible lg:items-end">
            <div className="just99-offer-wrap just99-offer-wrap-landing-form">
              <VedicHealingJoinForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
