import { useState } from 'react';

//! App component (parent)
function App() {
  //* lifted state from child Form component to parent App
  //* now state can be passed to all child cpmponents
  //* ie siblings of Form component from where this state was lifted
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

//! Logo component (child to app & sibling)
function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

//! Form component (child to app & sibling)
function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    //* function to update items piece of state which was lifted to parent component
    //* state updated when form is submitted
    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ? ✈️</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

//! PackingList component (child to app & sibling)
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} {...item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

//! Item component (child to Packinglist)
function Item({ id, description, quantity, packed, onDeleteItem }) {
  return (
    <li>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

//! Stats component (child to app & sibling)
function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have x items on your list, and you already packed x%</em>
    </footer>
  );
}

export default App;
