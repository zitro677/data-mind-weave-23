

# Add CV Download Button

## Overview
Add a button to download your CV in PDF format. The button will be placed in the Hero section, near the existing "Explore My Work" button, and will support both English and Spanish languages.

## Implementation Steps

### Step 1: Add Your CV PDF File
You'll need to provide your CV PDF file. I'll place it in the `public` folder so it can be downloaded directly.

**File location:** `public/cv-luis-ortiz.pdf`

### Step 2: Add Translation Keys
Add bilingual text for the download button in `src/contexts/LanguageContext.tsx`:

| Key | English | Spanish |
|-----|---------|---------|
| `hero.downloadCV` | Download CV | Descargar CV |

### Step 3: Add Download Button to Hero Section
Modify `src/pages/Index.tsx` to include a new download button:

- Import the `Download` icon from `lucide-react`
- Add a new button next to the existing "Explore My Work" button
- The button will use the `<a>` tag with `download` attribute wrapped in a styled Button component
- Style it consistently with the existing button (outline variant, accent colors)

**Button placement:** In the Hero section, alongside the existing CTA button, creating a row of two buttons:
```
[Explore My Work] [Download CV]
```

### Step 4: Button Design
- Use the `Download` icon from lucide-react
- Apply the same styling as the existing button (outline variant)
- Add a subtle hover effect
- The button will trigger a direct PDF download when clicked

## Technical Details

**Files to modify:**
1. `src/contexts/LanguageContext.tsx` - Add translation keys
2. `src/pages/Index.tsx` - Add the download button with Download icon

**Files to add:**
1. `public/cv-luis-ortiz.pdf` - Your CV file (you'll need to provide this)

**Download approach:** Using an anchor tag with the `download` attribute ensures the PDF downloads directly rather than opening in a new tab.

## Important Note
You'll need to upload your CV PDF file. After I implement the button, please upload your CV and I'll add it to the `public` folder with the correct filename.

