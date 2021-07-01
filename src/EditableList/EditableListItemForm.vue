<template>
  <!-- Modal -->
  <div class="modal fade" :id="uniq_id" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-if="item != null" class="modal-body">
          <div v-for="(key, idx) in fields" :key="'input'+key+idx" class="input-group input-group-sm mb-3">
            <span class="input-group-text w-50" id="inputGroup-sizing-sm"> {{ key.input_field }}</span>
            <input v-model="item[key.input_field]" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
          </div>
          <slot name='customFormFields' :item='item'></slot>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-primary" @click="$emit('apply')">Apply</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { onMounted, ref, defineComponent, watch, watchEffect, toRef, toRefs } from 'vue';


export default defineComponent({
  name: "EditableListItemForm",
  props: {
    item: Object,
    fields: Array,
    toggle_form: Boolean,
    title: String,
  },
  emits: ['apply', 'cancel'],
  setup(props){
    var modal_form;
    var modal = null;

    const { toggle_form } = toRefs(props);
    const uniq_id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    
    onMounted(()=>{
      modal_form = document.getElementById(uniq_id);
      modal = new window.bootstrap.Modal(modal_form, {
        keyboard: false,
        backdrop: 'static'
      });
    })

    watch( toggle_form, () => {  if (modal != null) { modal.toggle() } })

    return {
      uniq_id
    }
  }
})
</script>