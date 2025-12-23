const MenuItemCard = ({ item, onAdd }) => (
  <div>
    <h4>{item.name}</h4>
    <p>₹{item.price}</p>
    <button onClick={() => onAdd(item)}>Add</button>
  </div>
);

export default MenuItemCard;
