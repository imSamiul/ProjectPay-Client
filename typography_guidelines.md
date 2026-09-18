When designing for different devices, font sizes should be adaptable to ensure readability and usability across screen sizes. Below are ideal font size recommendations for **tablet**, **desktop**, and **mobile** devices:

### **1. Desktop (≥ 1024px width)**

- **Body Text:** 16–18px
- **Headings:**
  - H1: 32–40px - text-xl
  - H2: 28–32px
  - H3: 24–28px
  - H4: 20–24px
  - H5: 18–20px
  - H6: 16–18px
- **Buttons / UI elements:** 14–16px
- **Small Text / Captions:** 12–14px

### **2. Tablet (768px – 1024px width)**

- **Body Text:** 14–16px
- **Headings:**
  - H1: 28–36px
  - H2: 24–28px
  - H3: 20–24px
  - H4: 18–20px
  - H5: 16–18px
  - H6: 14–16px
- **Buttons / UI elements:** 12–14px
- **Small Text / Captions:** 12px

### **3. Mobile (≤ 767px width)**

- **Body Text:** 14–16px
- **Headings:**
  - H1: 24–32px
  - H2: 22–26px
  - H3: 20–22px
  - H4: 18–20px
  - H5: 16–18px
  - H6: 14–16px
- **Buttons / UI elements:** 12–14px
- **Small Text / Captions:** 10–12px

### **General Guidelines:**

- **Line Height:** 1.4–1.6 for body text to maintain good readability.
- **Contrast & Legibility:** Ensure high contrast between text and background, especially on mobile, where smaller font sizes are more common.
- **Scalable Units:** Use relative units like `rem` or `em` for responsive typography. A good base font size for the `html` tag is `16px` (1rem = 16px), making scaling easier across devices.
- **Viewport Breakpoints:** Use media queries to adjust the font size for different screen sizes, ensuring readability remains consistent.

#### Example of Scalable Typography in CSS:

```css
html {
  font-size: 16px; /* Base font size */
}

@media (max-width: 1024px) {
  html {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
```

This approach helps maintain a balance between aesthetics and functionality across devices.
