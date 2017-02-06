<template>
  <div class="card-deck m-3">
    <div v-for="(row, index) in items" class="card m-2">
      <div class="card-block" key={{index}}>
        <h4 class="card-title text-center">{{index}}</h4>
        <p class="card-text text-center">{{row.name}}</p>
        <p class="text-muted text-center">{{row.status}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cards',
  props: {
    items: {
      type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
