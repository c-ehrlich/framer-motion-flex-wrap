import "./styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import cuid from "cuid";
import randomWords from "random-words";

const defaultItems = [
  { id: cuid(), value: randomWords({ exactly: 2, join: " " }) },
  { id: cuid(), value: randomWords({ exactly: 2, join: " " }) },
  { id: cuid(), value: randomWords({ exactly: 2, join: " " }) },
  { id: cuid(), value: randomWords({ exactly: 2, join: " " }) }
];

const animations = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 }
};

export default function App() {
  const [items, setItems] = useState(defaultItems);

  function addItem() {
    setItems([
      {
        id: cuid(),
        value: randomWords({ exactly: 2, join: " " })
      },
      ...items
    ]);
  }

  function deleteItem(index: number) {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  }

  return (
    <div className="App">
      <button
        style={{ marginBottom: "16px", padding: "8px" }}
        onClick={addItem}
      >
        Add Item
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "8px"
        }}
      >
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "space-between",
                width: "200px",
                border: "1px solid black",
                padding: "8px"
              }}
              {...animations}
            >
              <p>{item.value}</p>
              <button
                onClick={() => deleteItem(index)}
                style={{ padding: "8px" }}
              >
                x
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
