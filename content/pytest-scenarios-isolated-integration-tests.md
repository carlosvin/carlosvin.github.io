---
title: "Isolated Integration Tests with pytest-scenarios"
date: 2026-01-03
lang: en
description: "Use pytest-scenarios to create isolated integration test data that cleans itself up automatically."
toc: true
aliases: ["/posts/pytest-scenarios-integration-tests"]
taxonomies:
  tags: ["python", "testing", "pytest", "mongodb", "integration-testing"]
---


Integration tests are essential for catching bugs that unit tests miss—but they come with a notorious problem: **shared state**. When tests share a database, they become flaky, order-dependent, and painful to debug.

What if each test could start with a clean slate, with exactly the data it needs, without manual cleanup or complex fixtures?

That's what [`pytest-scenarios`](https://github.com/carlosvin/pytest-scenarios) does.

## The Problem

Consider testing an e-commerce checkout system. You need to verify that:

- Active customers can complete orders
- Suspended customers are rejected  
- Out-of-stock items fail gracefully

Each scenario requires different data. With traditional approaches, you either share fixtures (tests interfere), manually clean up (boilerplate hell), or use transaction rollbacks (complex and misses commit-time bugs).

## The Solution: Declarative Test Scenarios

With `pytest-scenarios`, you declare *what state you need*, and the plugin handles the rest:

```python
def test_checkout_rejects_suspended_customer(scenario_builder, db):
    # Arrange: Declare the scenario
    scenario_builder.create({
        "customers": [{"customer_id": "user_1", "status": "suspended"}],
        "products": [{"product_id": "item_1", "in_stock": True}],
        "orders": [{"id": "order_1", "customer_id": "user_1", ...}],
    })

    # Act: Run your business logic
    checkout = Checkout(db)
    result = checkout.process(order_id="order_1")

    # Assert: Verify the outcome
    assert result.success is False
    assert "not active" in result.error
```

No manual cleanup. No fixture dependencies. Each test is completely isolated.

## Key Concepts

### Templates Define Defaults

Define templates with sensible defaults—tests only override what matters:

```python
# tests/templates/customers.py
TEMPLATE = {
    "name": "John Doe",
    "email": "john.doe@example.test",
    "status": "active",
}
```

### Automatic Cleanup

The plugin clears all managed collections *before each test*. Even if a test fails, the next test starts fresh.

### Real Database Testing

Tests run against a real MongoDB instance, catching issues that mocks would miss: query errors, index problems, schema mismatches.

## Try It Yourself

I've created a complete runnable example that demonstrates `pytest-scenarios` with a simple e-commerce checkout system.

👉 **[View the example on GitHub](https://github.com/carlosvin/pytest-scenarios/tree/main/examples)**

The example includes:

- A [`Checkout` class](https://github.com/carlosvin/pytest-scenarios/blob/main/examples/src/checkout.py) with real business logic
- [Integration tests](https://github.com/carlosvin/pytest-scenarios/blob/main/examples/tests/integration/test_checkout.py) covering happy paths and edge cases
- [Templates](https://github.com/carlosvin/pytest-scenarios/tree/main/examples/tests/templates) for customers, products, and orders

### Quick Start

```bash
git clone https://github.com/carlosvin/pytest-scenarios.git
cd pytest-scenarios/examples
```

Then follow the instructions in the [example README](https://github.com/carlosvin/pytest-scenarios/blob/main/examples/README.md) to run the tests.

## Installation

```bash
pip install pytest-scenarios
# or
uv add pytest-scenarios
```

Configure in `pyproject.toml`:

```toml
[tool.pytest.ini_options]
db-url = "mongodb://127.0.0.1:27017"
db-name = "my_test_db"
templates-path = "tests/templates"
```

## Learn More

- 📦 [PyPI Package](https://pypi.org/project/pytest-scenarios/)
- 📁 [GitHub Repository](https://github.com/carlosvin/pytest-scenarios)
- 📖 [Example Project & README](https://github.com/carlosvin/pytest-scenarios/tree/main/examples)

---

Stop fighting flaky integration tests. Let `pytest-scenarios` handle the isolation while you focus on what matters: testing your business logic.
