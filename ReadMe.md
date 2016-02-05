# A Beard, An App, A Blender

The refactored supporting project repository for the session given at IBM Connect 2016, **AD1380 - A Beard, An App, A Blender: One Developer's Take on Expanding How We Can Develop Apps for Domino/XPages**.

## Repository Information

This repo has 3 branches.

1. `master` contains the slide deck in Keynote (`.key`), PowerPoint (`.pptx`), and PDF (`.pdf`) formats, along with this `README`.
2. `simple` contains my home-grown tasks and bower setup, which are viewable in the Gruntfile
3. `yo` contains the 

## Usage

The included On Disk Project (ODP) was developed and tested with a current version of Domino Designer (DDE); specifically on 9.0.1 FP5 with ExtLib 9.0.1 v15. The ODP _should_ work on any version of 9.0.1, but if you're interested in advanced tooling to automate parts of your development workflow, why on Earth should you be looking back?

The ODP included is the same for each implementation, with an empty `WebContent` folder (save for `WEB-INF`). The ODP includes two potential points of entry, via a _DesignerFacesServlet_, accessible via `...nsf/xsp/beers` or via an _xe:restService_'s _xe:customRestService_; the former is the primary and expected endpoint, with the latter included to show the versatility and accessibility of a segregated design, which can include a RESTful API deployed by OSGi plugin, XAgent, or even the demonstrated _xe:restService_ with SSJS.

### Commands / Tasks

#### `simple` branch

The `simple` branch is meant to be a starting place for the uninitiated, with a few strategically chosen tasks. It includes bower, with the path configured to `ODP/WebContent/libs`. The Grunt tasks that can be invoked for the `simple` branch.

| Task          |      Actions Performed      |
|---------------|:---------------------------:|
| `grunt`       | performs the 'build'*, 'browser-sync', and 'watch' tasks |
| `grunt build` | performs _only_ the 'build' task   |
| `grunt clean` | cleans the output directory, `ODP/WebContent/` |

The 'build' task includes the clean, jshint, uglify, cssmin, and htmlmin tasks, then copies the files to the production path and injects the client-side assets dynamically. It also outputs a text file with a unique filename in the root of the `WebContent` directory, so as to attempt to force DDE to pick up on the changes and perform the sync from ODP into the NSF.

#### `yo` branch

The `yo` branch takes a majority of the `generator-angular` defaults, save for `dist` build path being replaced with `ODP/WebContent`. Of note, the build task 

| Task          |      Actions Performed      |
|---------------|:---------------------------:|
| `grunt`       | performs the 'build'* task after jshint and js tests |
| `grunt serve` | performs the build task then connects live-reload task |
| `grunt clean` | cleans the output directory, `ODP/WEbContent/` |
| `grunt test`  | executes the js test scripts via the `karma` test runner |

The 'build' task includes the clean, jshint, uglify, cssmin, htmlmin, cdnify, and filerev tasks, then copies the files to the production path and injects the client-side assets dynamically.

## Contributing

This is not currently meant to be more than a reference and potential starting point for those looking to start from a "known good" point with use of `bower`, `grunt`, and potentially yeoman (`yo`) in conjunction with a a Domino/XPages application, being served as native, optimized web assets.

## History

The topics of incorporating task runners and embracing "web normal" assets for the front-end of a Domino/XPages application as discussed in the session given at IBM Connect 2016 and covered in [my blog](https://edm00se.io/) are born of a want and need to reconcile multi-platform application design and development practices for an easy to maintain and support application structure, along with adhering to best practices in the segregation of an app into "service layers".

## In Action and Future

I'll likely be compiling a Notes in 9 containing the abbreviated version of my session, focusing on the advanced tooling aspect. Feel free to check out [blog post](https://edm00se.io/self-promotion/connect-success-and-a-demo) which contains the video of a demo recapping the moving parts.

## Credits

The node packages (modules installed by `npm`) are copyright of their respective sources and authors, including [Grunt](http://gruntjs.com/) and [Yeoman](http://yeoman.io/) and [Yeoman's generator-angular](https://github.com/yeoman/generator-angular).

## License

My source code containered herein is licensed open source under The MIT License (MIT).

Copyright (c) 2016 Eric McCormick.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.