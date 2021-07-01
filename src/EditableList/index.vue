<template>
  <div class="editable-list">
    <button type="button" class="btn btn-primary m-1" v-on:click="newItem">
      Add
    </button>

    <editable-list-item-form
      :item="editeble_list_item_form_item"
      :fields="fields"
      :toggle_form="toggle_form"
      :title="editable_list_item_form_title"
      @apply="applyChange"
    >
    </editable-list-item-form>

    <table class="table table-striped table-hover border">
      <thead>
        <tr>
          <th
            scope="col"
            v-for="(field, idx) in fields"
            :key="'editable_list_item_' + idx"
          >
            {{ field.input_field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <editable-list-row
          v-for="item in items"
          :key="JSON.stringify(item.id)"
          :item="item"
          :fields="fields"
          @click="editItem(item)"
        >
        </editable-list-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent } from "vue";
import { getPutHeader } from "../tools";

import EditableListRow from "./EditableListRow";
import EditableListItemForm from "./EditableListItemForm";

export default defineComponent({
  name: "EditableList",
  components: {
    EditableListRow,
    EditableListItemForm,
  },
  props: {
    list_url: String,
    fields: Array,
    item_name: String,
  },
  setup(props) {
    const editeble_list_item_form_item = ref({});
    const editable_list_item_form_title = ref("");
    let _is_new_item = false;
    const items = ref([]);
    const toggle_form = ref(true);

    const applyChange = async () => {
      let url = _is_new_item
        ? props.list_url + ".json"
        : editeble_list_item_form_item.value.url;
      let method = _is_new_item ? "POST" : "PATCH";

      await fetch(url, {
        method,
        body: JSON.stringify({
          [props.item_name]: editeble_list_item_form_item.value,
        }),
        headers: getPutHeader(),
      }).then(() => {
        loadItemsList().then(() => {
          toggle_form.value = !toggle_form.value;
          editeble_list_item_form_item.value = null;
        });
      });
    };

    const _showEditableListItemForm = (title) => {
      toggle_form.value = !toggle_form.value;
      editable_list_item_form_title.value = title;
    };

    const loadItemsList = async () => {
      items.value = await fetch(props.list_url + ".json").then((response) =>
        response.json()
      );
    };
    const newItem = async () => {
      let new_item = {};
      props.fields.forEach((field) => {
        new_item[field.name] = "";
      });
      editeble_list_item_form_item.value = new_item;
      _is_new_item = true;
      _showEditableListItemForm("New Item");
    };
    const editItem = (item) => {
      _is_new_item = false;
      editeble_list_item_form_item.value = item;
      _showEditableListItemForm("Edit Item");
    };

    onMounted(() => {
      loadItemsList();
    });

    return {
      editeble_list_item_form_item,
      editable_list_item_form_title,
      items,
      newItem,
      editItem,
      applyChange,
      toggle_form,
    };
  },
});
</script>
