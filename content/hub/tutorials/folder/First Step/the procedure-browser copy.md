---
title: The Procedure Browser
type: docs
weight: 1
---

## Introduction

The **GIMP Procedure Browser** is a handy tool within GIMP that allows you to explore and search through all the functions, or "procedures," available for use in GIMP, including those from built-in features, external plug-ins, and custom Script-Fu scripts. It’s an essential resource for developers looking to create or modify plug-ins, as it provides detailed information about the available functions, their parameters, and how to use them.

### Where to Find the GIMP Procedure Browser

You can access the Procedure Browser in GIMP through the **Help** menu:

- **Help** -> **Procedure Browser**

### What the Procedure Browser Does

The Procedure Browser lists all of GIMP’s internal procedures, along with those added by plug-ins, including the one you’ve just installed. Each procedure entry provides useful information, including:

- The procedure name.
- A description of what it does.
- The parameters it accepts (input values).
- The return values (output).

You can search by keyword or function name, making it easy to find the specific procedure you need. This browser is incredibly useful when you want to see what functions are available for image manipulation or when you need to verify how a certain function should be used in your scripts.

#### (gimp-message) in the Procedure Browser

![procedure-browser](/images/procedure-browser.webp)

### Finding Your Plug-in

Once you’ve installed the "Hello World!" plug-in, you can find it listed in the Procedure Browser. Simply search for the function name that you registered with GIMP, in this case, "script-fu-hello-world". The entry will display the parameters and any return values associated with the plug-in, along with a brief description. You’ll also see where some of the text lines you entered as input parameters during the registration process are displayed under the **Additional Information** section.

```scheme
(script-fu-register-procedure "script-fu-hello-world"   ;; Procedure name
  "Hello world!"                                        ;; Menu item name
  "A Script-Fu procedure plug-in"                       ;; Tool tip and description
  "Your Name"                                           ;; Author
  "Under GNU GENERAL PUBLIC LICENSE Version 3"          ;; License
  "2024")                                               ;; Copyright Date
```

This makes it easy to verify that your plug-in is properly registered and gives you a quick way to review how it interacts with other procedures in GIMP. The Procedure Browser is a powerful tool for debugging and expanding your plug-ins by exploring all available procedures within GIMP.
