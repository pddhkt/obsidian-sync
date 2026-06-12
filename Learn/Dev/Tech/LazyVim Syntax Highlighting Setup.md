# LazyVim Syntax Highlighting Setup

## Overview

This guide documents the setup for enabling proper syntax highlighting in LazyVim with semantic tokens and Treesitter support, specifically optimized for TypeScript/TSX development.

## What Was Configured

### 1. Treesitter Configuration

**File:** `/home/lmt/.config/nvim/lua/plugins/treesitter.lua`

Features enabled:
- Syntax highlighting with Treesitter
- Auto-install missing parsers
- Incremental selection
- Smart indentation
- Support for multiple languages:
  - TypeScript/TSX
  - JavaScript/JSX
  - HTML/CSS
  - JSON/JSONC
  - Markdown
  - Python
  - Lua
  - Bash
  - And more

### 2. LSP Semantic Tokens

Enhanced semantic token support for better color differentiation:
- Variables
- Functions
- Methods
- Types/Interfaces
- Classes
- Properties
- Comments
- Keywords
- Operators
- Strings/Numbers

### 3. Gruvbox Theme Enhancement

**File:** `/home/lmt/.config/nvim/lua/plugins/colorscheme.lua`

Theme configuration:
- Enabled **italics** for comments and strings
- Enabled **bold** for keywords
- Full terminal color support
- Proper contrast settings
- Undercurl and strikethrough support

### 4. TypeScript/TSX Support

**File:** `/home/lmt/.config/nvim/lua/plugins/typescript.lua`

Features:
- Configured `ts_ls` LSP server
- Enabled inlay hints for:
  - Parameter names
  - Variable types
  - Function return types
  - Property types
  - Enum member values
- Full semantic token support

## Expected Color Differentiation

When properly configured, you should see:

| Element | Color | Style |
|---------|-------|-------|
| Comments | Gray/Muted | Italic |
| Keywords (`const`, `export`, `return`) | Pink/Purple | Bold |
| Function names | Blue | Normal |
| Variables | Light Blue/Cyan | Normal |
| Strings | Green | Italic |
| Types/Interfaces | Yellow | Normal |
| JSX/HTML tags | Orange/Red | Normal |
| Numbers | Purple | Normal |
| Operators | Light Gray | Normal |

## Installation & Setup

### Initial Setup

1. Configuration files are located in:
   ```
   ~/.config/nvim/lua/plugins/
   ├── treesitter.lua
   ├── colorscheme.lua
   └── typescript.lua
   ```

2. To apply changes:
   ```bash
   # Close all Neovim instances
   # Then open Neovim
   nvim
   ```

3. LazyVim will automatically:
   - Install missing parsers
   - Configure LSP servers
   - Apply theme settings

### Manual Update

If you need to manually update:

```vim
" In Neovim command mode
:Lazy sync              " Sync all plugins
:TSUpdate              " Update Treesitter parsers
:checkhealth nvim-treesitter  " Check Treesitter health
```

## Verification

### Check Syntax Highlighting

1. Open a TypeScript/TSX file
2. Verify color differentiation:
   - Comments should be italic and gray
   - Function names should be blue
   - Variables should be distinct from functions
   - Keywords should be bold and pink/purple

### Health Checks

Run these commands in Neovim to verify everything is working:

```vim
:checkhealth nvim-treesitter
:checkhealth lsp
:TSInstallInfo
```

## Troubleshooting

### Colors Not Showing Correctly

1. Ensure your terminal supports 24-bit true color
2. Check terminal `$TERM` variable:
   ```bash
   echo $TERM
   ```
   Should be: `xterm-256color` or better

3. Verify Treesitter parsers are installed:
   ```vim
   :TSInstallInfo
   ```

4. Update parsers:
   ```vim
   :TSUpdate
   ```

### LSP Not Working

1. Check LSP status:
   ```vim
   :LspInfo
   ```

2. Install TypeScript language server:
   ```vim
   :Mason
   ```
   Search for `typescript-language-server` and install

### Semantic Tokens Not Working

1. Verify semantic tokens are enabled for your LSP server:
   ```vim
   :lua print(vim.inspect(vim.lsp.get_active_clients()[1].server_capabilities.semanticTokensProvider))
   ```

2. Ensure your LSP client supports semantic tokens

## Configuration Files

### Treesitter Configuration

```lua
-- ~/.config/nvim/lua/plugins/treesitter.lua
return {
  {
    "nvim-treesitter/nvim-treesitter",
    opts = {
      highlight = { enable = true },
      auto_install = true,
      ensure_installed = {
        "typescript", "tsx", "javascript",
        "html", "css", "json", "lua", "bash"
      },
    },
  },
}
```

### Colorscheme Configuration

```lua
-- ~/.config/nvim/lua/plugins/colorscheme.lua
return {
  {
    "ellisonleao/gruvbox.nvim",
    config = function()
      require("gruvbox").setup({
        italic = {
          strings = true,
          comments = true,
        },
        bold = true,
      })
    end,
  },
}
```

### TypeScript Configuration

```lua
-- ~/.config/nvim/lua/plugins/typescript.lua
return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        ts_ls = {
          settings = {
            typescript = {
              inlayHints = {
                includeInlayParameterNameHints = "all",
                -- ... other settings
              },
            },
          },
        },
      },
    },
  },
}
```

## Additional Resources

- [LazyVim Documentation](https://www.lazyvim.org/)
- [Treesitter Documentation](https://github.com/nvim-treesitter/nvim-treesitter)
- [Gruvbox Theme](https://github.com/ellisonleao/gruvbox.nvim)
- [LSP Configuration](https://github.com/neovim/nvim-lspconfig)

## Notes

- Configuration date: 2025-11-13
- Theme: Gruvbox
- Terminal: Arch Linux
- Optimized for TypeScript/TSX development

## Related

- [[WireGuard Tunnel Usage]]
- [[Tmux]]
- See also: Dev/Claude Code for AI-assisted development tools
