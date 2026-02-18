# Contributing to Aswin's Portfolio

To maintain the stability and quality of the portfolio website, we follow a Pull Request-based workflow.

## Development Process

1. **Branching**: Do not commit directly to `main`. Create a new branch for every feature or fix.
   - Example: `feat/new-animation` or `fix/contact-form-padding`.
2. **Commit Messages**: Use clear, descriptive commit messages (standard prefixes like `feat:`, `fix:`, `perf:`, `chore:` are encouraged).
3. **Pull Requests**: Once your changes are ready, push your branch to GitHub and open a Pull Request to the `main` branch.
4. **CI Checks**: A GitHub Action will automatically attempt to build the project. Ensure the build passes before merging.
5. **Merging**: Merges to `main` should only occur after the build succeeds and the changes have been reviewed.

## Local Development
Run the project locally to verify changes before pushing:
```bash
flutter run -d web-server --web-port 3000
```
