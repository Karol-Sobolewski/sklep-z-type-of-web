import {
  ProductImageFragment,
  ReviewContentFragment,
} from "../../../../generated/graphql";
import ProductReviewForm from "./ProductReviewForm";
import ProductReviewList from "./ProductReviewList";

interface ProductDetails {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: ProductImageFragment[];
  reviews: ReviewContentFragment[];
}

interface ProductReviewContainerProps {
  productData: ProductDetails;
}

export default function ProductReviewContainer({
  productData,
}: ProductReviewContainerProps) {
  return (
    <div>
      <ProductReviewList productSlug={productData.slug} />
      <ProductReviewForm
        productId={productData.id}
        productSlug={productData.slug}
      />
    </div>
  );
}
