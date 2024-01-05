const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip ? ✈️</h3>
    </div>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ description, quantity, packed }) {
  return (
    <li>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have x items on your list, and you already packed x%</em>
    </footer>
  );
}

export default App;
