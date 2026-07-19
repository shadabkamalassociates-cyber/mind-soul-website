import Image from "next/image";
import { StarIcon } from "@/components/Icons";

type Review = {
  id: string;
  text: string;
  name: string;
  location: string;
  image: string;
};

const reviews: Review[] = [
  {
    id: "1",
    text: "SoulSensei has completely transformed my life. The experts are genuinely caring and the sessions are life-changing.",
    name: "Priya Sharma",
    location: "Mumbai",
    image: "/experts/expert-1.jpg",
  },
  {
    id: "2",
    text: "The meditation sessions helped me overcome anxiety and find inner peace. Highly recommended!",
    name: "Rohit Verma",
    location: "Bangalore",
    image: "/experts/expert-5.jpg",
  },
  {
    id: "3",
    text: "Tarot guidance was so accurate and detailed. It gave me clarity and direction in life.",
    name: "Sneha Iyer",
    location: "Chennai",
    image: "/experts/expert-3.jpg",
  },
];

export default function CommunityReviews() {
  return (
    <section id="reviews" className="relative w-full bg-[#05070A] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <h2
          className="mb-7 text-[28px] font-medium leading-tight text-white sm:mb-8 sm:text-[34px] lg:text-[40px]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Community Reviews
        </h2>

        <div className="reviews-row flex gap-4 overflow-x-auto pb-1 sm:gap-5 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card flex w-[min(320px,85vw)] shrink-0 flex-col rounded-2xl p-5 sm:w-[min(340px,70vw)] sm:p-6 lg:w-auto lg:min-w-0">
      <div className="mb-4 flex items-center gap-[3px] text-[#D4AF37]">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      <p className="flex-1 text-[14px] leading-[1.7] text-white sm:text-[15px]">
        {review.text}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#D4AF37]/35">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover object-top"
            sizes="44px"
            quality={80}
          />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-white">{review.name}</p>
          <p className="mt-0.5 text-[12px] text-[#A0A0A0]">{review.location}</p>
        </div>
      </div>
    </article>
  );
}
