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
    text: "Cosmicguruji has completely transformed my life. The experts are genuinely caring and the sessions are life-changing.",
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
    <section id="reviews" className="relative w-full bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 xl:px-12">
        <h2
          className="mb-5 text-[24px] font-medium leading-tight text-[#3D3D8F] sm:mb-8 sm:text-[34px] lg:text-[40px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Community Reviews
        </h2>

        <div className="reviews-row grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
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
    <article className="review-card flex h-full min-w-0 flex-col rounded-xl p-3.5 sm:rounded-2xl sm:p-6 lg:min-w-0">
      <div className="mb-2.5 flex items-center gap-[2px] text-[#EAB308] sm:mb-4 sm:gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      <p className="line-clamp-4 flex-1 text-[12px] leading-[1.6] text-[#3D3D8F] sm:line-clamp-none sm:text-[15px] sm:leading-[1.7]">
        {review.text}
      </p>

      <div className="mt-4 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#3D3D8F]/25 sm:h-11 sm:w-11">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover object-top"
            sizes="44px"
            quality={80}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-[#1A1A4A] sm:text-[14px]">
            {review.name}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-[#5C5C7A] sm:text-[12px]">
            {review.location}
          </p>
        </div>
      </div>
    </article>
  );
}
