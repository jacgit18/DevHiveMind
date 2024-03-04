---
tags:
  - OOP
author:
  - jacgit18
  - chatgpt
Comments: This documentation discusses
Status: Refinement
Started: 2023-10-29
EditDate: 2023-10-29
Relates:
---
## Abstraction in Object-Oriented Programming

- Abstraction involves:
  - Understanding the function and uses of a class.
  - Hiding the actual implementation from the user, promoting simplicity and ease of use.
  - Achieved through abstract classes or interfaces, defining class behavior without implementation.
  - Deferring object behavior to its child classes.

## Abstract Class vs Interface Distinctions

- **Abstract Class:**
  - Allows defining functionality for subclasses to implement or override.
  - Permits both method declaration and implementation.
  - Supports single inheritance; a class can extend only one abstract class.
  - Identified by the 'abstract' keyword.

- **Interface:**
  - Permits stating functionality but not implementing it.
  - Includes method declarations without bodies.
  - Supports multiple inheritance; a class can implement multiple interfaces.
  - Identified by the 'interface' keyword.
  - Neither abstract class nor interface creates objects in Java.

## Inheritance vs Abstraction: Differentiating Principles

- **Inheritance:**
  - Focuses on sharing and reusing functionality.
  - Allows a class to inherit attributes and behaviors from another class.
  - Enhances code reusability and extensibility.

- **Abstraction:**
  - Focuses on hiding the implementation details.
  - Simplifies complex systems for user interaction.
  - Declares abstract classes or interfaces to define behavior without specifying implementation details.

Understanding these principles aids in designing flexible, maintainable, and scalable object-oriented systems.
# Structural model
![[Abstract class Diagram.png]]
