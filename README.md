# React Data Table with Tailwind CSS

This project is a React component for displaying data in a table format, styled with Tailwind CSS. It supports features like pagination, loading state, and dark mode.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/react-data-table-tailwind.git
   cd react-data-table-tailwind
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

Import the `DataTable` component and use it in your React application:

```tsx
import React from "react";
import { DataTable } from "./src/DataTable";
import "./src/index.css";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "Email", accessor: "email" },
];

const data = [
  { name: "John Doe", age: 30, email: "john@example.com" },
  { name: "Jane Smith", age: 25, email: "jane@example.com" },
];

function App() {
  return (
    <div className="App">
      <DataTable
        columns={columns}
        data={data}
        loading={false}
        usePagination={true}
        totalPages={5}
      />
    </div>
  );
}

export default App;
```

## Props

The `DataTable` component accepts the following props:

- `columns`: An array of column definitions.
- `data`: An array of data objects.
- `loading`: A boolean indicating if the data is loading.
- `usePagination`: A boolean indicating if pagination should be used.
- `totalPages`: The total number of pages (required if `usePagination` is `true`).
- `onPageChange`: A function to handle page changes.
- `dark`: A boolean to enable dark mode.

## License

This project is licensed under the ISC License.

```

Feel free to customize the README further based on your specific needs.
```
