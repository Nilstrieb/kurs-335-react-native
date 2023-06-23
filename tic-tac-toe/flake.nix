{
  description = "tic-tac-toe";

  # Flake inputs
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs"; 
    android-nixpkgs = {
      url = "github:tadfisher/android-nixpkgs";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, android-nixpkgs }:
    let
      allSystems = [
        "x86_64-linux" # 64-bit Intel/AMD Linux
        "aarch64-linux" # 64-bit ARM Linux
        "x86_64-darwin" # 64-bit Intel macOS
        "aarch64-darwin" # 64-bit ARM macOS
      ];

      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      packages = forAllSystems ({pkgs} : {
        android-sdk = android-nixpkgs.sdk (sdkPkgs: with sdkPkgs; [
          cmdline-tools-latest
          build-tools-32-0-0
          platform-tools
          platforms-android-31
          emulator
        ]);
      });
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs-18_x # Node.js 18, plus npm, npx, and corepack
            gradle # For the android build
          ];
        };
      });
    };
}
