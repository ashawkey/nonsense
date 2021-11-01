# NoNSeNSe

React Frontend for Nonsense, a minimal online note App.

Hosted by [listener](https://github.com/ashawkey/listener.git) @ hawia project.


### [>>> Demo <<<](https://kiui.moe/nonsense/)


##### Home page

![editor](./img/home.png)

##### Editor page

![editor](./img/editor.png)


### Develop

* change `API_ROOT` to `API_ROOT_DEV` in `const.js`.
* ```npm run start```

### Deploy

#### install the built version
* clone the gh-pages branch: `git clone -b gh-pages https://github.com/ashawkey/nonsense.git`

* change `API_ROOT` in `config.js` to your own remote server port.
* use nginx to serve them.

#### build by yourself
* change `API_ROOT` in `public/config.js` to your own remote server port.
* ```npm run build```
* use nginx to serve them / for gh-pages jsut run ```npm run deploy```.


### Change Log
* [2021-11-1] change document title at editor page & add random emojis.
* [2021-9-12] replace the former markdown editor with [Milkdown](https://github.com/Saul-Mirone/milkdown).
* [2021-10-7] moved config file to public, so you can directly change `ROOT_API` for the built version.