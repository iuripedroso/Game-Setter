export default function StarRating({ rating }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const isHalf = rating % 1 !== 0;

  let stars = '★'.repeat(fullStars);
  if (isHalf) stars += '½';
  stars += '☆'.repeat(totalStars - Math.ceil(rating));

  return <span className="rating-stars">{stars}</span>;
}
