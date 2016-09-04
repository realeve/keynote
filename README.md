## HomePage

[realeve.github.io/keynote](https://realeve.github.io/keynote)

## document syntax

> you can see guide from [reveal-js](http://lab.hakim.se/reveal-js/)
>
> but only support markdown syntax so far.
>
> default separator `----`

# insert new item

> clone this repository to your local

```
git clone git@github.com:realeve/keynote.git
vi keynote/markdown/xxx.md
```

> append your information in menu.json

```
vi keynote/menu.json
```

> example

```
{
  "list": [
    {
      "author": "your name",
      "homepage": "your github homepage",
      "path": "fullname of your document",
      "title": "document name",
      "weibo": "your weibo homepage"
    }
  ]
}
```

> create new pull request to that branch named "gh-pages" and @ [realeve](github.com/realeve)
>
> if your pr is merged then you can access your document online.