<template>
  <tr>
    <td v-for="(field, idx) in fields" :key="'item_field'+JSON.stringify(item.id)+idx">
      {{ item[field.input_field] }}
    </td>
  </tr>
</template>


<script>
export default {
  props: {
    fields: Array,
    item: Object,
  }
  
}
</script>