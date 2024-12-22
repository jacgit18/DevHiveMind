## UnitedHealthcare UHC Balanced - $1,500 - COIE gold
### Medical Plan:
UnitedHealthcare Choice Plus
### Member ID:
982879874
### Group Number:
04Q0081

Health First Medicad last Insurance 


Dental is guardian insurance

Current dentist accepts new insurance but not taking new patients but since your previous patient call to check if they will accept it

718-469-6077


Vision is guardian insurance VSP Network 
Flatbush optical is near the cemetery now 2011 Church avenue

### Dental & Vision insurance member Id
944643858 

GU944643858

### Reference number 
230119-007940



```dataviewjs 

// Define a new book entry
const newBook = {
    file: { link: "[New Book](path/to/new-book)" },
    genre: "Fiction",
    "time-read": "2 hours",
    rating: 4.5
};

// Fetch the existing pages tagged with #book, and add the new book entry
// const books = dv.pages("#books ").array.concat([newBook]);

// Render the updated table
const table = dv.markdownTable(
    ["File", "Genre", "Time Read", "Rating"],
    dv.pages("#book")
        .sort(b => b.rating) // Sort by rating
        .map(b => [b.file.link, b.genre, b["time-read"], b.rating]) // Map fields to table columns
);

dv.paragraph(table);


let page = dv.current().file.path; let pages = new Set(); let stack = [page]; while (stack.length > 0) { let elem = stack.pop(); let meta = dv.page(elem); if (!meta) continue; for (let inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) { console.log(inlink); if (pages.has(inlink.path)) continue; pages.add(inlink.path); stack.push(inlink.path); } } 

// Data is now the file metadata for every page that directly OR indirectly links to the current page. 
let data = dv.array(Array.from(pages)).map(p => dv.page(p));


dv.table(["ghghg", "hdhdh"])
```
