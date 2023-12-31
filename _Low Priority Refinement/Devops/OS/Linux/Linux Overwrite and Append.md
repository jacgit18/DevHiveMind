---
tags: 
author:
  - jacgit18
Status: 
Started: 
EditDate: 
Relates:
---
In Linux and Unix-like systems, these symbols (`>`, `>>`, `&>`, `2>`, and `2>>`) are used for redirecting and handling input and output streams, particularly with regard to standard output (stdout) and standard error (stderr). Here's an explanation of the differences between them:

1. `>` (Output Redirection):
   - Syntax: `command > file`
   - Description: Redirects the standard output (stdout) of a command to a file, overwriting the file if it exists. If the file does not exist, it is created.
   - Example: `ls > file.txt` will list the contents of the current directory and save the output to `file.txt`, overwriting its previous contents if any.

2. `>>` (Append Output):
   - Syntax: `command >> file`
   - Description: Redirects the standard output (stdout) of a command to a file, but appends the output to the end of the file instead of overwriting it. If the file does not exist, it is created.
   - Example: `ls >> file.txt` will append the list of files in the current directory to the end of `file.txt`.

3. `&>` (Redirect Both Stdout and Stderr):
   - Syntax: `command &> file`
   - Description: Redirects both the standard output (stdout) and the standard error (stderr) of a command to a file. This is a shorthand for redirecting both streams to the same file.
   - Example: `ls non_existent_directory &> error.log` will redirect both the standard output and standard error (e.g., "No such file or directory" error messages) to `error.log`.

4. `2>` (Redirect Stderr Only):
   - Syntax: `command 2> file`
   - Description: Redirects only the standard error (stderr) of a command to a file while leaving the standard output (stdout) unchanged.
   - Example: `ls non_existent_directory 2> error.log` will redirect only the error messages to `error.log`.

5. `2>>` (Append Stderr):
   - Syntax: `command 2>> file`
   - Description: Redirects only the standard error (stderr) of a command to a file, appending it to the end of the file.
   - Example: `ls non_existent_directory 2>> error.log` will append error messages to `error.log`.

In summary:

- `>` and `>>` are used for redirecting standard output (stdout).
- `&>` redirects both stdout and stderr to a file.
- `2>` redirects only stderr.
- `2>>` appends stderr to a file.

These redirection operators are powerful for managing the output and error messages generated by commands in Linux. They allow you to capture, store, or discard both standard output and standard error as needed, making them essential for scripting and command-line operations.