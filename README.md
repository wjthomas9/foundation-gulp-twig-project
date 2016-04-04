Project Name
==========

### Dependencies

* Foundation http://foundation.zurb.com/docs/
* NPM https://www.npmjs.com/
* Gulp http://gulpjs.com/
* Bower http://bower.io/
* BEM http://getbem.com/
* Git https://git-scm.com/
* Twig https://github.com/justjohn/twig.js/wiki

### Project Setup

**Installing Node.js and npm**
https://docs.npmjs.com/getting-started/installing-node

**Installing Bower**
```
sudo npm install -g bower
```

**If you already have NPM and bower, consider updating them**
```
sudo npm update -g bower
sudo npm install npm -g
```


### Frontend development workflow using Gulp

**Using Gulp**

The frontend development assets, such as css, javascript, images and fonts are compiled or built using Gulp. A local development server is provided with BrowserSync. To start frontend development, run the following command in your terminal from the project root directory:

```
gulp
```

To build the frontend assets to the distribution directory (currently the root directory), run the following command

```
gulp build
```

To build the frontend assets for production, use the following command

```
gulp build --production
```


### Frontend Templating using Twig

Frontend templates are built using the Twig JS template engine. You can view the documentation here: wig https://github.com/justjohn/twig.js/wiki

Twig templates can process data objects using the gulp-data plugin. Learn more at https://github.com/colynb/gulp-data


### CSS Approach using BEM

This project uses the BEM approach to naming CSS components and classes (not used for Foundation-specific classes). To learn more about BEM, visit the following links:

* https://en.bem.info/method/
* http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
* https://css-tricks.com/bem-101/
* http://getbem.com/introduction/
* http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/


### Git Branching Strategy

There are 3 primary branches: dev, staging and master

**master branch**

The master branch should only contain working code. Merge deployable code from feature branches into master when it's ready to deploy.

**feature Branches**

If a feature is large enough, consider creating a branch specifically for developing the new feature. When done, issue a pull request to merge the feature into master.

Learn more at https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

