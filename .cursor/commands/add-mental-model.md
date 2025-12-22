# Add Mental Model (Demo)

## Overview
Add one new mental model entry to this repository’s `data/mental-models.json`.

This is a **demo-safe** command:
- Keep changes small and readable
- Follow the existing JSON schema exactly
- Do not introduce new files, frameworks, or build tools

## Steps
1. **Locate the data source**
   - Find and open `data/mental-models.json`
   - Confirm it is a JSON array of mental model objects

2. **Read current mental models**
   - Collect existing `id` values (must remain unique)
   - Collect existing `title` values
   - Identify what “role” is missing (a complementary mental model)

3. **Validate terminology with Context7**
   - Use Context7 to verify:
     - Official Cursor feature names for `relatedFeatures`
     - Official Cursor docs URLs for `docs`
   - Prefer `docs.cursor.com` links when available

4. **Generate exactly ONE new mental model object**
   - Must include:
     - `id` (kebab-case, unique)
     - `title` (format: "Cursor as a …")
     - `shortDescription` (1–2 sentences)
     - `detailedExplanation` (5 bullet strings)
     - `relatedFeatures` (4–6 strings, official names)
     - `docs` (1–3 `{ "label", "url" }` objects)

5. **Append it to the JSON array**
   - Add the object as the last element in the array
   - Keep formatting consistent with existing entries
   - Do not modify existing entries unless required for validity

6. **Sanity check**
   - Ensure JSON is valid (no trailing commas, correct quotes)
   - Run the site and confirm the new card appears and opens in the modal

## Output Checklist
- [ ] Added exactly one new object
- [ ] `id` is unique and kebab-case
- [ ] `title` starts with “Cursor as a”
- [ ] `detailedExplanation` has 5 bullets
- [ ] `relatedFeatures` uses official terminology (Context7-verified)
- [ ] `docs` links are official and open correctly
- [ ] Site still works locally
