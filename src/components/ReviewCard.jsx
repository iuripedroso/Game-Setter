// import StarRating from "./StarRating";

// export default function ReviewCard({ review }) {
//   return (
//     <div className={`review-card ${review.compact ? 'compact-review' : ''}`}>
//       <div className="review-header-game">
//         <img
//           src={review.gamePoster}
//           alt={`${review.gameTitle} Poster`}
//           className="game-poster"
//           onError={(e) => (e.target.src = "https://placehold.co/50x75/000/fff?text=GS")}
//         />
//         <div className="review-info">
//           <div className="rating-user">
//             <img
//               src={review.userAvatar}
//               alt={`${review.username} Avatar`}
//               className="user-avatar"
//               onError={(e) => (e.target.src = "https://placehold.co/25x25/ccc/000?text=U")}
//             />
//             <span className="user-info">{review.username}</span>
//             <StarRating rating={review.rating} />
//           </div>
//           <h3>{review.gameTitle}</h3>
//           <p>{review.gameYear}</p>
//         </div>
//       </div>
//       <div className="review-text">{review.reviewText}</div
      
//       >
//       <div className="review-actions">
//         <a href="#">❤️</a>
//         <span>{review.likes} likes</span>
//       </div>
//     </div>
//   );
// }
