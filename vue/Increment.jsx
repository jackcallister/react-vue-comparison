import Vue from 'vue'

export default Vue.component('Increment', {
  functional: true,

  props: {
    title: '',
    onClick: null,
  },

  render: (h, { props: { title, increment } }) => {
    return (
      <button on-click={() => { increment() }}>{title}</button>
    )
  },
})
