# LineShift

A simple but useful VS Code extension that allows you to **jump between lines using relative navigation**, inspired by how Vim/NeoVim works with relative line numbers.

I built this extension out of a personal need, cause I wanted to improve my navigation but couldn’t find any extension that supported the **`j` and `k` keys** as operators for moving up and down. So I created my own (will add support to custom keys later, so you don’t have to make your own too).

---

## Features

- Relative line jumps using signals:
  - `+` or `k` → move down
  - `-` or `j` → move up
- Jump to an **absolute line number** by entering a number with no sign
- Input validation ensures:
  - Only one operator is allowed (`+`, , `j`, `k`).
  - You can’t go outside of the document range.
- Helpful error messages when you type an invalid format or try to go out of bounds.

---

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and Run the command: `LineShift: Jump` or pressing `Alt+G` (default keybinding)
2. Enter:
   - A number (e.g., 42) → go directly to that line.
   - A relative input (e.g., +10, 5, j3, k7) → jump up/down from your current line.

Examples:

- `+5` → move 5 lines down
- `2` → move 2 lines up

- `j4` → move 4 lines up
- `42` → go to line 42
