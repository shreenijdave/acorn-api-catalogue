
## Filter Catalogue

A responsive, accessible React.js catalogue interface that fetches live data from an API and allows users to search, filter, and preview content such as courses and videos. Designed to meet WCAG 2.2 AA accessibility standards.

---

## Features

- **Filterable by** content type, category, and tags
- **Search by name** with instant results
- **Catalogue cards** display title, image, and summary
- **Accessible modal** with full course details
- **WCAG 2.2 AA compliant**: keyboard navigation, labels, color contrast
- **Slick UI** using Material UI with custom styling
- Uses a **Node.js proxy** to securely fetch data from a bearer-token protected API


---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shreenijdave/acorn-api-catalogue.git
cd acorn-api-catalogue
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the React app

```bash
npm run dev
```

### 4. Start the Node.js proxy (in a new terminal)

```bash
cd proxy
npm install
node index.js
```

### 5.
Open http://localhost:5173 in your browser

> **Note**: Replace the bearer token in `proxy/index.js` with a valid one provided by the API.

---

## Accessibility & WCAG 2.2 AA

This project is designed to meet **Web Content Accessibility Guidelines (WCAG) 2.2 Level AA**, including:

- Semantic HTML (`<main>`, `<button>`, `<label>`, etc.)
- ARIA attributes for screen readers
- Full **keyboard support** (tab, enter, escape)
- Visible **focus indicators**
- High **color contrast**
- Screen-reader friendly labels
- Logical heading structure and modal focus trap

---

## UI Components

### Content Card
- Title, summary, image
- Truncated summary (2 lines)
- Clickable and keyboard accessible

### Modal Popup
- Shows full title, image, summary, type, category, and tags
- Fully responsive and accessible
- Includes “View Full Course” link

### Filter Controls
- Material UI `Autocomplete` combo boxes
- Filters for type, category, tags
- Search box with instant filtering
- “Reset Filters” pill-style button

---

## API Integration

- API data is fetched via `proxy/index.js` using a bearer token
- Proxy prevents CORS issues in development
- Data is loaded from:  
  `https://staging.acornlms.com/local/acorn_coursemanagement/index.php/api/1.1/external_catalogue/188?perPage=16`

---

## Technologies Used

- React (Vite)
- Material UI (v5)
- Axios for API calls
- Node.js for proxy server
- WCAG 2.2 Accessibility

---

## Author

Made by Shreeni Dave

---

## License

This project is for demonstration and interview purposes — open for educational use.
