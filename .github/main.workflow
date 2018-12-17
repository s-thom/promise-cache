workflow "Release to NPM" {
  on = "release"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@6309cd9"
  secrets = ["NPM_TOKEN"]
  runs = "publish"
}
