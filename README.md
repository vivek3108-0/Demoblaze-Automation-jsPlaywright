# DemoBlaze Automation Testing Framework

A comprehensive test automation framework for DemoBlaze e-commerce website built with Playwright and JavaScript.

## Overview

This project automates end-to-end testing for DemoBlaze online store, covering user authentication, shopping cart functionality, checkout process, and UI validations.

## Features

- Cross-browser testing (Chrome, Firefox, Safari)
- Page Object Model design pattern
- Automated HTML test reports
- Screenshot capture on failures
- Parallel test execution

## Test Coverage

**Authentication (4 tests)**

- Valid user login
- Invalid credentials handling
- Empty form validation
- User logout functionality

**Shopping Cart (4 tests)**

- Single product addition
- Multiple products handling
- Product removal
- Authenticated user operations

**Checkout Process (2 tests)**

- Complete order placement
- Form validation testing

**UI Components (4 tests)**

- Category filtering
- Image loading validation
- Alert handling
- Modal interactions

## Installation & Setup

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run tests
npm test

# View reports
npx playwright show-report
```

## Project Structure

├── pages/ # Page Object Model files
├── tests/ # Test specification files
├── utils/ # Test data and utilities
├── playwright.config.js # Configuration file
└── package.json # Project dependencies

## Technology Stack

- **Framework**: Playwright
- **Language**: JavaScript
- **Pattern**: Page Object Model
- **Reporting**: HTML Reports
- **CI/CD**: GitHub Actions Ready

## Application Under Test

**DemoBlaze**: https://www.demoblaze.com

- E-commerce demo application
- Product categories: Phones, Laptops, Monitors
- Features: User registration, shopping cart, checkout

## Test Results

All tests execute across multiple browsers with detailed reporting including:

- Pass/fail status
- Execution screenshots
- Performance metrics
- Error details

## Author

Created as part of test automation learning and practice.
