# React+MobX Vue Comparison

TLDR; React + MobX > Vue

I wanted to investigate Vue JS and make a direct comparison with React. Check out the code in each directory. They're small (super small) apps that just increment a counter, super trivial. There's not much code, but there's plenty to talk about. Both approaches are very, very similar. It's essentially the same architecture. The major differences are the existing eco-systems, JSX vs templating and separation of data management (MobX + React vs Vue as an integrated solution).

## Data Management

Under the hood Vue uses an observable object system similar to MobX. For this reason I decided comparing React + MobX to Vue was appropriate. After reading the following (from the Vue docs) it became obvious that this was the right approach.

**MobX has become quite popular in the React community and it actually uses a nearly identical reactivity system to Vue. To a limited extent, the React + MobX workflow can be thought of as a more verbose Vue, so if you’re using that combination and are enjoying it, jumping into Vue is probably the next logical step.** [1](https://vuejs.org/guide/comparison.html#With-MobX)

With Vue you pass a plain old state/store object (whatever you want to call it) to the Vue instance (this mounts the application) as a data property. It "observifies" the object and when mutations occur the respecive views re-render.

With MobX an object can be specified as observable. This object can be passed through the React Component tree via wrapping it in a Provider component. Next, and this is an important difference, any component down the tree can declare itself an observer and pluck the necessary data it needs from the observable.

Using Provider feels developer friendly as the alternative in Vue is to pass each piece of data down the tree as props. While in theory that explicitness sounds good, in practice it means changing numerous files when changes are required and weaving data through components which don't require it. I'd rather each component declares it's dependiencies which are then extracted from the context in React.

MobX is also seperated from any rendering or component initialization, unlike in Vue. With MobX you are free to declare computed properties and actions on an observable object, which you can pass around and use where ever you like. In Vue the computed properties are coupled to the Vue instance initialization like so:

Vue
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

MobX
```
class Store {
  @observable firstName = 'Foo';
  @observable lastName = 'Bar';

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}
  }
}

const data = new Store()
```

I prefer the control a decoupled data management solution provides over the integrated Vue solution. I imagine testing and server side rendering would be much easier with MobX. However, integration also makes getting started quite easy and keeps the file sizes light weight as we shall see.

## Templating and JSX

Vue seems unable to decide between Virtual DOM + JSX or a custom DSL templating language. The reasoning (at a glance) appears to be CSS and separation of concerns. [2](https://vuejs.org/guide/comparison.html#HTML-amp-CSS)

This reasoning doesn't particularly make sense as one can use CSS however they see fit and separation of concerns has been become dogma since React proved otherwise. Vue does not recommend using render functions.

**In Vue, we also have render functions and even support JSX, because sometimes you need that power. Render functions are not recommended for most components however.

Instead, we offer templates as a simpler alternative:**

```
<template>
  <div class="list-container">
    <ul v-if="items.length">
      <li v-for="item in items">
        {{ item.name }}
      </li>
    </ul>
    <p v-else>No items found.</p>
  </div>
</template>
```

I would argue a new DSL and templating system is a much more complex alternative over pure JavaScript rendering functions. It's even more obvious that the Vue comparison documentation is skewed in favour templating. Here is the original render function suggested for the above template.

```
render () {
  let { items } = this.props
  let children
  if (items.length > 0) {
    children = (
      <ul>
        {items.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
    )
  } else {
    children = <p>No items found.</p>
  }
  return (
    <div className='list-container'>
      {children}
    </div>
  )
}
```

Here is my "corrected" version. The above example is clearly trying to demonstrate the unreadability of JSX over templating by using extraneous branching and inline looping. Readability within a render function is determined by the programmer writing the code, wheras the templating system in Vue would determine the readability. Note: I'm unsure if one can call out to other rendering methods within the Vue `render` function, if that's not the case then this is a severe restriction.

```
renderList() {
  return this.props.items.map((item, i) => {
    return <li key={i}>{item.name}</li>
  })
}

render () {
  const list = this.renderList()
  const content = list.length ? <ul>{items}</ul> : <p>No items found.</p>

  return (
    <div className='list-container'>
      {content}
    </div>
  )
}
```

Having complained about all this, there is light at the end of the tunnel. Vue does indeed support using a render function and JSX can easily be used. What concerns me is the rejection of what is clearly a successful paradigm for UI programming. With a DSL you are always restricted to the functions available within the templating subset. With JSX you have the full range of JavaScript and any other modules you may need. I'm at a loss as to why Vue is pushing the templating system.

## File Size and Compilation

Vue wins hands down in this scenario. React is much bigger even more so when combined with MobX. The example applications are contrived and small but the size difference is obvious.

Development:
```
          Compile time --------- Size
Vue:       821ms                 159kB
React:    1411ms                 881kB
```

Production:
```
          Compile time --------- Size
Vue:      2871ms                  59kB
React:    8614ms                 282kB
```

Vue is miles ahead in this battle, if lightweight performance and file size are essential, I would definitely opt for Vue.

## Build tools

They are exactly the same in almost every respect. Not much more needed to say here.

## General Vibe

I don't like the name MobX, it looks and sounds like something I'd say as a teenager making up words. Vue sounds cool, but the green on the website is sickly. React is big, but useful and not so big that I'm not going to use it. The logo needs a refresh too; what does React have to do with an atom? Anyway, React is around for the long term. It's nice that the same principals learned using React can be used with alternative frameworks like Vue. If I need a super light, fast application to work on mobile 3G I may look at using Vue, especially since it's an integrated solution. For everything else I'll probably rely on React, if it's needed, and MobX, again only if it's really needed.
