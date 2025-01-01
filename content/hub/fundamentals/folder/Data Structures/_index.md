---
title: Data Structures
type: docs
---

## Introduction

In Script-Fu, **data structures** are essential tools for organizing, storing, and manipulating data. They enable developers to build efficient, readable, and reusable scripts. By choosing the right data structure for a specific problem, you can optimize both the performance and clarity of your code.

---

## Key Data Structures in Script-Fu

Script-Fu provides several powerful and versatile data structures, each suited for specific tasks. The primary data structures include:

### Lists
Lists are ordered collections of elements that can dynamically grow or shrink. They are ideal for sequential or hierarchical data and are widely used in functional programming.

Key features:
- Dynamically sized.
- Elements can be of mixed types.
- Commonly used for recursive algorithms and representing tree-like structures.

Examples of use:
- Managing collections of items.
- Representing sequences or hierarchies.

---

### Vectors
Vectors are fixed-size collections of elements, indexed for fast access. They are best suited for scenarios where performance and positional access are critical.

Key features:
- Fixed size at creation.
- Elements are accessed by their index.
- Faster than lists for certain operations like random access.

Examples of use:
- Storing fixed-size configurations or data.
- Quick lookups and updates based on position.

---

### Choosing the Right Data Structure

The decision to use a **list** or a **vector** depends on the specific needs of your script. Here are some guidelines:

| Feature                 | Lists                        | Vectors                        |
|-------------------------|------------------------------|--------------------------------|
| **Size Flexibility**    | Dynamic                     | Fixed                         |
| **Access Speed**        | Slower (sequential access)  | Faster (indexed access)       |
| **Ease of Modification**| Easier                      | Harder (requires reallocation)|
| **Use Cases**           | Dynamic data, recursion     | Static data, fast lookups     |

---
