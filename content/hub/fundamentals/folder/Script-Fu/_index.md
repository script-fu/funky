---
title: Script-Fu 
type: docs
weight: 1
---

## Introduction

Script-Fu is built on the [Scheme](https://www.scheme.org/) programming language, using [TinyScheme](https://tinyscheme.sourceforge.net/home.html) Version 1.42 as its interpreter. GIMP extends TinyScheme with additional commands for tasks such as file handling.

{{< cards >}}

{{< card link="pdb" title="PDB" icon="cog" >}}
{{< card link="libscriptfu" title="libscriptfu" icon="cog" >}}
{{< card link="script-fu-interpreter" title="Script-Fu Interpreter" icon="cog" >}}
{{< card link="tinyscheme" title="TinyScheme" icon="cog" >}}
{{< card link="https://conservatory.scheme.org/schemers/Documents/Standards/R5RS/HTML/" title="Scheme Programming Language" icon="cog" >}}

{{< /cards >}}

GIMP exposes its internal functionality to Script-Fu through a large library of callable functions. These are listed in the Procedure Database (PDB), which you can browse directly from within GIMP using the [Procedure Browser](https://script-fu.github.io/funky/hub/tutorials/folder/first-step/the-procedure-browser-copy/).

You can also add new functions to the PDB. This can be done by writing Script-Fu plug-ins (Scheme files that register new procedures), or by implementing plug-ins in C or Python. We can also add new functions to the PDB, directly via C code.