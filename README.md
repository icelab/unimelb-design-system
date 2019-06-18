# Unimelb Design System

**Copyright &copy; 2017 - The University of Melbourne**

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.


## Set-up

The design system requires Ruby v2.3.3, Node.js v6.9.3, and the latest version of [yarn](https://yarnpkg.com/en/). To set it up, run:

```
git clone https://github.com/unimelb/unimelb-design-system.git
cd unimelb-design-system
cp .env.example .env
bundle install
yarn
```


## Development

1. Run `foreman start` or `yarn start`
2. Visit [http://localhost:7000/](http://localhost:7000/)

To build the assets for production (e.g. for debugging purposes), run `yarn run build`. The compiled targets can be found in the `/build` directory.


## Testing

Supported browsers:
- last two versions of Chrome, Firefox and Edge
- IE 9, 10 and 11
- Safari 8+
- iOS 8.4+
- Android 4.4+
- Firefox ESR (v52.x)

Recommended mobile devices for testing:
- iPhone 4S
- iPhone 6
- iPad 2
- Galaxy s5


## Workflow

### Development

1. Find or create an issue on GitHub.
2. Create a new branch from master, making sure to give it a useful and concise name (e.g. `feat-inline-form`, `fix-styled-select-ie`, `refactor-short-header`, etc.)
3. Commit your changes to this new branch.
4. Test your changes across browsers and devices.
5. Open a pull request with a concise message and detailed description, making sure to reference any issue/s that can be automatically closed when the PR is merged (e.g. `Fix #<issue-number>`). If the PR is still a work in progress, assign the `pr-wip` tag to it.
6. Assign the `pr-patch`, `pr-minor` or `pr-major` tag to the PR to identify the [semver](http://semver.org/) level of the change (patch = bug fix, minor = new feature, major = breaking change).
7. Decide whether to merge the PR now or wait for a later release. For instance, you may not want to merge a breaking change (`pr-major`) right away in case a critical bug fix comes up.
8. When ready, merge the PR and assign the `next-release` milestone to it. If the PR resolves any issues, assign the milestone to them too.
9. Delete your local branch, as well as the remote branch.


### Release preparation

1. Once there are enough changes for a release, identify the highest semver level (e.g. `pr-major`) assigned to the PRs in the `next-release` milestone, and deduce the version number for the release - e.g. if the latest release was `v6.0.1` and at least one PR has tag `pr-minor`, the next release will be `v6.1`.
2. Create a new milestone and release draft. Name both after the chosen version number (e.g. `v6.1`). For major versions, you may want to start with a release candidate (RC): in the release draft, just tick the "pre-release" box and add `-rc1` to the name of the tag (e.g. `v7.0-rc1`).
3. Take a look at the [list of all issues and PRs](https://github.com/unimelb/unimelb-design-system/milestone/32) in the `next-release` milestone, then, for each PR and associated issues, document the changes in the release notes and reassign the PR and issues to the new milestone (e.g. `v6.1`). At the end of this process, the `next-release` milestone should no longer be assigned to any PR/issue and the release notes should be complete. Don't publish the release notes yet.


### Deployment

1. Update the version number in `package.json` and commit the change straight to `master`.
1. Update the `VERSION` environment variable in the `.env` file and in Semaphore. For release candidates, use the version number without the `-rc` suffix so early adopters don't have to update their design system version twice.
2. Perform a manual deployment in [Semaphore](https://semaphoreci.com/unimelb/unimelb-design-system): navigate to the latest build of the `master` branch and select _Deploy manually_.
3. Check that the new version is live at `https://d2h9b02ioca40d.cloudfront.net/<version-number>/uom.<js|css>`.


### Documentation site

1. After deploying the new version, run `RACK_ENV=dev MODE=prod rackup -p 7000` locally.
2. Test the documentation site at http://localhost:7000. You can check all components at once at http://localhost:7000/components/all. Fix any issues and redeploy if needed.
3. If you haven't already done so, clone the [static-capture](https://github.com/waitingallday/static-capture) project.
4. Find your IP address.
5. From the root of the `static-capture` directory, run `rake capture source=http://<ip-address>:7000`.
6. Rename the newly created folder with the version number (e.g. `v6.1`).
7. Copy the favicons as well as `robots.txt` from the design system's `public` folder into this new folder.
8. Zip the folder and drag-and-drop it to Netlify, on the _Deploy_ page of the [web-unimelb](https://app.netlify.com/sites/web-unimelb/deploys) site.
9. Check the live site at https://web.unimelb.edu.au.


### Bookkeeping

10. Grab the deployment URL of the previous version of the documentation site on Netlify, and provide it in the [release notes](https://github.com/unimelb/unimelb-design-system/releases) of that version on GitHub.
11. Publish the release notes of the new version.
12. In the case of a release candidate, liaise with early adopters internally to deploy and test the new version on a limited number of sites. If this testing phase reveals any issues: fix them, perform a manual deployment in Semaphore, deploy the documentation site again if needed, test thoroughly, and re-publish the same release notes but with the release candidate number incremented (e.g. `v7.0-rc2`). Make sure to keep assigning issues and pull requests to the version's milestone and to keep documenting the changes in the release notes if relevant. Once the release candidate is considered stable, in the release notes, remove the `-rc` prefix from the tag name, untick the "pre-release" box and hit _Publish_.
13. Close the version's milestone in GitHub.
14. Announce the release in the `#general` Slack channel.


## Updating the legacy injection (< v6.0)

1. Create a local branch off the most recent legacy tag - e.g. `git checkout tags/v5.0.1 -b fix-something-in-injection`
2. Recreate `.env` from `.env.example` and set `CDNURL` to `"https://d2h9b02ioca40d.cloudfront.net/shared"`
3. Fix whatever you need to fix in the injection and commit the changes to your local branch (don't push them).
4. Run `NODE_ENV=production yarn run build` to compile the targets.
5. Copy the compiled injection files in the `build` folder to slingshot.
6. In slingshot, inside `src/templates`, duplicate the latest version's folder and rename it to, for instance, `v5.0.2`.
7. Run `bundle exec rake slingshot:compile`, then start a local web server and test your changes.
8. Commit your changes, then go back to the design system.
9. Create a tag from your branch and push it - e.g. `git tag v5.0.2`, then `git push origin v5.0.2`.
10. Delete your local branch - e.g. `git branch -D fix-something-in-injection`.
