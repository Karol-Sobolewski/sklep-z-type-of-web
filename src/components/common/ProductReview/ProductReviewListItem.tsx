import { ReviewContentFragment } from "../../../../generated/graphql";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}

export default function ProductReviewListItem({
  review,
}: ProductReviewItemProps) {
  const isOptimistic = review.id.startsWith(`-`);

  return (
    <li key={review.id} className={`${isOptimistic ? "opacity-50" : ""}`}>
      <blockquote>
        <header className="sm:flex sm:items-center sm:gap-4">
          <div className="flex">
            {[...Array(review.rating)].map((x, i) => (
              <div key={i}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>{" "}
              </div>
            ))}
            {[...Array(review.rating && 5 - review.rating)].map((x, i) => (
              <div key={i}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            ))}
          </div>

          <p className="mt-2 font-medium sm:mt-0">{review.headline}</p>
        </header>

        <p className="mt-2 text-gray-700 dark:text-white">{review.content}</p>

        <div className="mt-4">
          <p className="text-xs text-gray-500">
            {review.name} -{" "}
            {review.createdAt &&
              new Date(review.createdAt)
                .toISOString()
                .split("T")[0]
                .replaceAll("-", ".")}
          </p>
        </div>
      </blockquote>
    </li>
  );
}
