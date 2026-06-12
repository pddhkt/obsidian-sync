## Claude Code: --dangerously-skip-permissions Flag

### Purpose
The `--dangerously-skip-permissions` flag bypasses all permission checks and allows Claude to work uninterrupted until task completion.

### Usage
```bash
claude --dangerously-skip-permissions
```

### When to Use
- Fixing lint errors automatically
- Generating boilerplate code
- Automated workflows where you trust Claude completely
- CI/CD pipelines (with proper isolation)

### Risks ⚠️
Using this flag can result in:
- **Data loss**
- **System corruption**
- **Data exfiltration**
- Arbitrary command execution without confirmation

**Key Warning:** "Letting Claude run arbitrary commands is risky" and should be approached with extreme caution.

### Safe Usage Recommendations
To minimize risks, use this flag only in controlled environments:

1. **Use in a container without internet access**
2. **Follow Docker Dev Containers best practices**
3. **Never use on production systems**
4. **Always use in isolated environments**

### Known Issue with MCP Servers
There's a known bug (Issue #6856) where MCP server detection fails when using `--dangerously-skip-permissions`:

**Problem:** When a repository contains a `.mcp.json` file, Claude Code doesn't automatically detect or use these servers with the flag enabled.

**Workaround:** 
1. Start Claude Code once without the flag to trust the project's MCP servers
2. Then the flag works as expected in future sessions

### Best Practices
- Only use in development environments
- Use version control (git) to easily revert changes
- Run in Docker containers for isolation
- Review changes after Claude completes the task
- Never use with access to sensitive data or credentials

### References
- [Claude Code Best Practices - Anthropic](https://www.anthropic.com/engineering/claude-code-best-practices)
- [GitHub Issue #6856](https://github.com/anthropics/claude-code/issues/6856)
