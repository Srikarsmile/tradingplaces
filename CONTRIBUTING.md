# Contributing to Trading Places

Thank you for your interest in contributing to Trading Places! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Set up environment variables (see README.md)

## Development Guidelines

### Code Style

- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

### Component Structure

- Extract reusable components to `src/components/`
- Keep page components in `src/pages/`
- Use custom hooks for shared logic in `src/hooks/`
- Place constants in `src/constants/`

### Accessibility

- Always include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper focus management

### Testing

- Test your changes in multiple browsers
- Test responsive design on mobile and desktop
- Verify accessibility features
- Check error handling

### Commit Messages

Use clear, descriptive commit messages:
- `feat: Add new scenario type`
- `fix: Resolve authentication redirect issue`
- `refactor: Extract EmpathyGauge component`
- `docs: Update README with setup instructions`

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if needed
3. Test your changes thoroughly
4. Submit a pull request with a clear description
5. Address any review feedback

## Questions?

Feel free to open an issue for questions or discussions.
