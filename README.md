# Heroes of the Borderlands – A Négy Pecsét

Magyar nyelvű, mobilon és asztali böngészőben játszható fantasy rejtvény. Statikus HTML, CSS és JavaScript; nincs bejelentkezés, backend vagy adatgyűjtés.

## Használat

Nyisd meg az `index.html` fájlt, vagy szolgáld ki a mappát tetszőleges statikus webszerverrel. A pecsétek érintéssel, egérrel, illetve Tab és Enter/Space billentyűkkel forgathatók. A csökkentett mozgás rendszerbeállítását tiszteletben tartja.

## Szerkezet és bővítés

- `index.html`: az első rejtvény és a felirat.
- `assets/style.css`: közös megjelenés és animációk.
- `assets/puzzle.js`: állapotkezelés és a felirat feltételeinek ellenőrzése.
- Új rejtvényekhez hozz létre külön mappákat, például `puzzles/a-kovek-hangja/index.html`, saját JavaScript-fájllal. A közös stílus relatív útvonallal újrahasználható. Később a gyökéroldal rejtvényválasztóvá alakítható.

## Publikálás

GitHub Pages: `main` ág, `/ (root)` mappa. A `.nojekyll` biztosítja a közvetlen statikus kiszolgálást. Nincs fordítási lépés.

## Ellenőrzés

A felirat összes feltételét a 24 különböző permutáción ellenőriztük: pontosan egy sorrend felel meg. Ismétlődő jelképekkel nem aktiválható az ajtó.

A játékoldal nem jelenít meg megoldókulcsot vagy mesélői információt. Statikus, nyilvános alkalmazásként a forráskód és az ellenőrzés szabályai megvizsgálhatók.
