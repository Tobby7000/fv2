export default function DishCard({ item }) {
  const price = item.price === null ? "Market price" : `$${item.price}`;
  return (
    <div className="dish-card">
      <div className="dish-img">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" />
        ) : (
          item.name
        )}
      </div>
      <div className="dish-body">
        <span className="dish-cat">{item.category}</span>
        <div className="dish-top">
          <h3>{item.name}</h3>
          <span className="dish-price">{price}</span>
        </div>
        <p className="dish-desc">{item.desc}</p>
      </div>
    </div>
  );
}
