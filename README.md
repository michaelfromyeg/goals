# Goals

A goal tracking app.

- [Goals](#goals)
  - [Usage](#usage)
    - [General](#general)
    - [WSL](#wsl)

## Usage

Setup steps.

It is highly recommended you use Visual Studio Code.

### General

From the `goals/` directory.

1. Run `npm i`
2. Run `npm start`

### WSL

0. Ensure your **Android** phone is plugged in.
1. From an elevated PowerShell prompt, run `scripts/forward.ps1`.

    ```sh
    cd \\wsl$\Ubuntu\home
    ./path/to/this/repo/scripts/forward.ps1 
    ```

2. From a Linux shell, run `scripts/listen.sh`.
3. From the `goals/` directory, run `npm start`.
4. Type `a` to start the app, and `r` to reload.

When you're finished.

1. From an elevated PowerShell prompt, run `scripts/backward.ps1`.
2. `CTRL + C` the `listen.sh` script.

Support for iOS is not available, since you need macOS to do that.
