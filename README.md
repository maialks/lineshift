# LineShift

**Boost your navigation in VS Code** with relative and absolute line jumps, inspired by Vim/NeoVim motions.

No more endless scrolling — move exactly where you need, faster.

---

## Features

* **Relative navigation** (like Vim/NeoVim):

  * `+` or `j` → move **down**
  * `-` or `k` → move **up**
* **Absolute navigation**: jump to a specific line by just entering its number (e.g., `42`).
* **Input validation**:

  * Only one operator is allowed (`+`, `-`, `j`, `k`).
  * Prevents going outside the document range.
* **Helpful error messages** when inputs are invalid or out of bounds.

---

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Run **`LineShift: Jump`** or use the default shortcut: `Alt+G`
3. Enter your target:

* **Absolute line** → type the number

  * Example: `42` → jumps to line 42
* **Relative jump** → use `+`, `-`, `j`, or `k` with a number

  * `+5` → move **5 lines down**
  * `-2` → move **2 lines up**
  * `j4` → move **4 lines down**
  * `k7` → move **7 lines up**

---

## Why LineShift?

If you love the speed of Vim/NeoVim motions but don’t want to leave VS Code, **LineShift** brings that power right into your editor. Perfect for developers who want **faster, more precise navigation** without extra clutter.

---

## Roadmap

* Custom key mappings
* Extended motion operators
