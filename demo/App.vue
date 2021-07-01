<template>
  <editable-list
    :list_url='verbs_url'
    :item_name='item_name'
    :fields='verb_fields'
  ></editable-list>
</template>

<script>
  import { defineComponent } from "vue";
  import EditableList from './EditableList';
  
export default defineComponent({
  name: "App",
  components: {
    EditableList,
  },
  setup() {
    const verbs_url = "/posts"
    const item_name = 'post'

    const verb_fields = [
      { input_type: 'string', input_field: 'name' },
      { input_type: 'string', input_field: 'content' },
    ]

  return {
      verbs_url,
      verb_fields,
      item_name
    };
  },
})
</script>

<style lang="scss" scoped>

</style>