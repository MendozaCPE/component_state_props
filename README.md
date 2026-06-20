# 📱 React Native – Parent & Child Component Practice

A hands-on activity log documenting our practice session on **passing data between Parent and Child components** in React Native.

---

## 📺 Demo

▶️ [Watch on YouTube Shorts](https://www.youtube.com/shorts/F7jDPAYPN8Y)

---

## 🎯 Activity Overview

This activity focuses on understanding how **props** flow from a Parent component down to Child components in React Native — one of the core concepts of React's component architecture.

---

## 🧠 Concepts Practiced

- Creating **Parent components** that hold and manage state
- Passing **props** from Parent → Child
- Building **Child components** that receive and display props
- Understanding **one-way data flow** in React Native
- Rendering lists of Child components from a Parent

---

## 📂 Project Structure

```
project/
├── App.js                  # Entry point
├── components/
│   ├── ParentComponent.js  # Manages state, passes props
│   └── ChildComponent.js   # Receives and displays props
└── README.md
```

---

## 🔧 Example Code

### ParentComponent.js

```jsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [message, setMessage] = useState('Hello from Parent!');

  return (
    <View>
      <Text>I am the Parent</Text>
      <ChildComponent message={message} />
    </View>
  );
};

export default ParentComponent;
```

### ChildComponent.js

```jsx
import React from 'react';
import { View, Text } from 'react-native';

const ChildComponent = ({ message }) => {
  return (
    <View>
      <Text>I am the Child</Text>
      <Text>{message}</Text>
    </View>
  );
};

export default ChildComponent;
```

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start the project
npx expo start
```

---

## 📌 Key Takeaways

| Concept | Description |
|---|---|
| **Props** | Data passed from Parent to Child |
| **State** | Managed in the Parent, triggers re-renders |
| **One-way flow** | Data flows down, never up (unless using callbacks) |
| **Reusability** | Child components can be reused with different props |

---

## 👨‍💻 Activity Log

- ✅ Created Parent component with state
- ✅ Passed props to Child component
- ✅ Rendered Child inside Parent
- ✅ Tested on device/emulator
- ✅ Recorded demo on YouTube Shorts

---

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **JavaScript (ES6+)**
