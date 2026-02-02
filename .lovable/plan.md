
## Update "Explore My Work" Button Link

### Summary
Change the "Explore My Work" / "Explora Mi Trabajo" button to link to your portfolio at https://arkanatech.tech/portfolio/ instead of scrolling to the expertise section.

---

### Changes

**File: `src/pages/Index.tsx`**

1. **Convert the button from onClick to a link** (lines 64-70)
   - Change from `Button` with `onClick` to `Button` with `asChild` wrapping an `<a>` tag
   - Set the href to `https://arkanatech.tech/portfolio/`
   - Open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`

2. **Remove unused function** (lines 19-21)
   - The `scrollToExpertise` function will no longer be needed and can be removed

---

### Technical Details

**Current code:**
```tsx
<Button
  onClick={scrollToExpertise}
  variant="outline"
  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
>
  {t('hero.cta')}
</Button>
```

**New code:**
```tsx
<Button
  asChild
  variant="outline"
  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
>
  <a href="https://arkanatech.tech/portfolio/" target="_blank" rel="noopener noreferrer">
    {t('hero.cta')}
  </a>
</Button>
```

---

### Result
Both the English ("Explore My Work") and Spanish ("Explora Mi Trabajo") versions of the button will open your portfolio page at arkanatech.tech in a new browser tab.
