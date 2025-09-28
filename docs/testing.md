# Testing

The bot includes comprehensive unit tests to ensure functionality works correctly.

## Test Structure

Each major module has corresponding test files:

```
├── bully.test.js         # Tests for bully tracking system
├── conversion.test.js    # Tests for unit conversion functionality  
├── index.test.js         # Tests for main bot logic
├── threads.test.js       # Tests for thread bookmarking
├── threadsManager.test.js # Tests for thread storage management
├── timezone.test.js      # Tests for timezone display
└── jest.config.js        # Jest testing configuration
```

## Running Tests

**Run all tests:**
```bash
npm test
```

**Run specific test file:**
```bash
npm test -- bully.test.js
```

**Run tests in watch mode:**
```bash
npm test -- --watch
```

## Test Coverage

### Bully System (`bully.test.js`)
- Time calculation between bully events
- Bully count incrementing and storage
- Leaderboard functionality and sorting
- Record tracking for longest periods
- Message formatting with dynamic character replacement

### Unit Conversion (`conversion.test.js`)
- Temperature conversion (°F ↔ °C)
- Distance conversion (km ↔ mi, m ↔ ft, cm ↔ in)
- Weight conversion (kg ↔ lb, g ↔ oz)
- Regex pattern matching for various unit formats
- Edge cases and invalid inputs

### Main Bot Logic (`index.test.js`)
- Command pattern matching (bully commands)
- Message processing and routing
- Environment variable handling
- Discord.js integration mocks

### Thread Management (`threads.test.js`, `threadsManager.test.js`)
- Thread addition and validation
- Thread removal and cleanup
- Thread listing and formatting
- Storage persistence and retrieval
- Error handling for invalid thread IDs

### Timezone Display (`timezone.test.js`)
- Multi-timezone formatting
- Luxon DateTime integration
- Consistent output format across zones

## Testing Framework

**Jest Configuration:**
- Test environment: Node.js
- Automatic test discovery for `*.test.js` files
- Mock support for Discord.js interactions
- Enhanced mocking with `jest-mock-extended`

## Mocking Strategy

The tests use mocking for:
- **Discord.js objects**: Messages, channels, guilds, users
- **Node-persist storage**: Isolated test storage
- **Environment variables**: Controlled test configuration
- **External APIs**: Discord API interactions

## Best Practices

### Test Organization
- Each module tested in isolation
- Clear test descriptions following "should do X when Y" pattern
- Setup and teardown for storage/mock cleanup

### Mock Usage
- Mock external dependencies (Discord.js, storage)
- Test actual business logic, not library functionality
- Use realistic test data that matches production scenarios

### Coverage Goals
- Test happy paths and edge cases
- Verify error handling and graceful degradation
- Ensure data persistence works correctly

## Example Test Run

```bash
> npm test

PASS  ./bully.test.js
PASS  ./conversion.test.js  
PASS  ./timezone.test.js
PASS  ./threads.test.js
PASS  ./threadsManager.test.js
PASS  ./index.test.js

Test Suites: 6 passed, 6 total
Tests:       XX passed, XX total
Snapshots:   0 total
Time:        X.XXs
```

## Adding New Tests

When adding new features:

1. **Create corresponding test file**: `newFeature.test.js`
2. **Follow existing patterns**: Use similar structure to other tests
3. **Mock dependencies**: Don't test external libraries
4. **Test edge cases**: Invalid inputs, error conditions
5. **Update documentation**: Add test info to this file

## Debugging Tests

**Verbose output:**
```bash
npm test -- --verbose
```

**Debug specific test:**
```bash
npm test -- --testNamePattern="specific test name"
```

**Run tests with debugger:**
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```
