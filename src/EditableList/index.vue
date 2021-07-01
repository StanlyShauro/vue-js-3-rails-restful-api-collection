<template>

  <button type="button" class="btn btn-primary m-1" v-on:click="newItem" >
    Создать
  </button>

  <editable-list-item-form
    :item='editeble_list_item_form_item'
    :fields='fields'
    :toggle_form='toggle_form'
    :title="editable_list_item_form_title"
    @apply='applyChange'
  >
  <template v-slot:customFormFields='SlotProps' >
    <slot name='customFormFields' :item='SlotProps.item'></slot>
  </template>
  </editable-list-item-form>


  <table class="table table-striped table-hover border">
    <thead>
      <tr>
        <th scope="col" v-for="(field, idx) in fields" 
        :key="'editable_list_item_'+idx"> 
          {{ field.input_field }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        <tr 
          v-for="item in items" 
          :key="JSON.stringify(item.id)"
          @click="selectItem(item)"
          :class="(item.id == selected_item.id) ? 'selected' : ''"

        >
          <slot name="item" :item="item">
            <editable-list-row 
              :item='item'
              :fields='fields'
              
            ></editable-list-row>
          </slot>
          <td 
            class="text-end"
            @click.stop="editItem(item)"
          >
            <i class="bi bi-pencil-square"></i>
          </td>

        </tr>


    </tbody>
  </table>

</template>

<script>
import { onMounted, ref, defineComponent, watch, toRefs } from 'vue';
import { getPutHeader, sortArrayBy } from '../tools';

import EditableListRow from './EditableListRow'
import EditableListItemForm from './EditableListItemForm'


export default defineComponent({
  name: "EditableList",
  components: {
    EditableListRow,
    EditableListItemForm,
  },
  emits: ['row_click'],
  props: {
    list_url: String,
    fields: Array,
    item_name: String,
    foreign_key: Object
  },
  setup(props, context) {
    const editeble_list_item_form_item = ref({})
    const editable_list_item_form_title = ref('')
    let _is_new_item = false
    const items = ref([])
    const toggle_form = ref(true)
    const selected_item = ref({})

    const applyChange = async () => {
      let url    = (_is_new_item) ? props.list_url + ".json" : editeble_list_item_form_item.value.url;
      let method = (_is_new_item) ? 'POST' : 'PATCH'

      await fetch(url, 
        { 
          method, 
          body: JSON.stringify( {[props.item_name]: editeble_list_item_form_item.value} ), 
          headers: getPutHeader(),
        }).
        then(()=>{ 
          loadItemsList().then( () => {
            toggle_form.value = !toggle_form.value
            editeble_list_item_form_item.value = null
          });
        });
    }

    const _showEditableListItemForm = (title) => {
      toggle_form.value = !toggle_form.value
      editable_list_item_form_title.value = title
    }

    const loadItemsList = async () => {
      let params = {}
      if ( props.foreign_key!=null ) {
        params[props.foreign_key.field_name] = JSON.stringify(props.foreign_key.field_value)
      }

      items.value = await fetch(props.list_url + ".json?" + new URLSearchParams(params)).
      then((response) => response.json())

      props.fields.forEach(field => {
        if (field['sort']) {
          items.value = sortArrayBy(items.value, field.input_field)
        }
      })      
    }
    const newItem = async () => {
      let new_item = {}
      if ( props.foreign_key!=null ) {
        new_item[props.foreign_key.field_name] = props.foreign_key.field_value
      }
      editeble_list_item_form_item.value = new_item
      _is_new_item = true
      _showEditableListItemForm('New Item')
    }
    const editItem = (item) => {
      _is_new_item = false
      editeble_list_item_form_item.value = item
      _showEditableListItemForm('Edit Item')
    }

    const selectItem = (item) => {
      selected_item.value = item
      context.emit('row_click', item)
    }

    onMounted(()=>{
      loadItemsList()
    })

    const { foreign_key } = toRefs(props);
    
    if (props.foreign_key!==undefined) {
      watch( foreign_key, ()=> {
        loadItemsList()
      })
    }
 

    return {
      editeble_list_item_form_item,
      editable_list_item_form_title,
      items,
      newItem,
      editItem,
      selectItem,
      applyChange,
      toggle_form,
      selected_item,
      }
  },
})
</script>

<style lang="scss" scoped>
  tr {
    cursor: pointer;
    &.selected {
      background: aquamarine;
    }
  }
</style>