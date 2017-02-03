<template>
  <table class="table">
    <thead>
      <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(row, index) in items">
          <th>{{index}}</th>
          <td>{{row.name}}</td>
          <td>{{row.status}}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'data-table',
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
